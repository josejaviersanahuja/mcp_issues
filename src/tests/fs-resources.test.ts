// tests/fs-resources.test.ts

import { assertEquals } from "jsr:@std/assert";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import app from "../src/servers/fs-resources/index.ts"; // <-- Importa SOLO el app, no levantes servidor

Deno.test("POST /rpc should respond with 400 on invalid payload", async () => {
  const request = await superoak(app);

  await request
    .post("/rpc")
    .send({ foo: "bar" }) // Mandamos un body que no es JSON-RPC válido
    .expect(400); // Esperamos que el servidor tire un 400 Bad Request
});

Deno.test("POST /rpc should respond with 200 on valid JSON-RPC", async () => {
  const request = await superoak(app);

  await request
    .post("/rpc")
    .send({
      jsonrpc: "2.0",
      method: "resources/list",
      params: {},
      id: 1,
    })
    .expect(200)
    .expect((res) => {
      assertEquals(res.body.jsonrpc, "2.0");
      assertEquals(res.body.id, 1);
      // Aquí puedes checar más del contenido si quieres
    });
});