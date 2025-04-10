import { Application, Router } from "oak";

const router = new Router();

const diagnosticPrompt = {
  description: "Analiza los logs y sugiere una solución",
  arguments: ["fileUri"],
  steps: [
    "Lee el archivo de logs",
    "Detecta errores comunes",
    "Sugiere acciones",
    "Si se confirma, llama a createGitHubIssue",
  ],
};

router.post("/diagnose", async (context) => {
  try {
    const { fileUri } = await context.request.body().value;

    // Step 1: Read log file
    const logResponse = await fetch(`http://localhost:8001/logs/${fileUri}`);
    const { content } = await logResponse.json();

    // Step 2: Analyze content (simplified for demo)
    const errors = content.split("\n").filter((line) =>
      line.includes("error") ||
      line.includes("exception") ||
      line.includes("failed")
    );

    // Step 3: Generate suggestions
    const suggestions = errors.map((error) => ({
      error,
      suggestion: "Revisar la configuración del servidor y los timeouts",
    }));

    context.response.body = {
      prompt: diagnosticPrompt,
      analysis: {
        errorsFound: errors.length,
        suggestions,
      },
    };
  } catch (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8003;
console.log(`MCP Server C (Prompts) running on port ${PORT}`);
await app.listen({ port: PORT });
