import { Application, Router } from "oak";

const router = new Router();

router.post("/diagnose-error", async (context) => {
  try {
    const { fileUri } = await context.request.body().value;

    // Step 1: Get server status
    const statusResponse = await fetch("http://localhost:8002/status");
    const serverStatus = await statusResponse.json();

    // Step 2: Run diagnostic
    const diagnosticResponse = await fetch("http://localhost:8003/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUri }),
    });
    const diagnostic = await diagnosticResponse.json();

    // Step 3: Prepare response for AI model
    context.response.body = {
      serverStatus,
      diagnostic,
      nextSteps: [
        "Review the diagnostic analysis",
        "Confirm if GitHub issue should be created",
        "Implement suggested fixes",
      ],
    };
  } catch (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;
console.log(`MCP Client running on port ${PORT}`);
await app.listen({ port: PORT });
