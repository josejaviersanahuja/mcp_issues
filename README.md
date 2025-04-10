# MCP - AI Technical Support Agent

This system provides an AI-powered technical support agent that can:

- Access and analyze log files
- Check server status
- Suggest fixes for common errors
- Automate GitHub issue creation

## Architecture

The system consists of four main components:

1. MCP Client (Port 8000) - Main coordination point
2. MCP Server A (Port 8001) - File system access
3. MCP Server B (Port 8002) - Tools (server status, GitHub)
4. MCP Server C (Port 8003) - Prompts and diagnostics

## Setup

1. Install Deno: https://deno.land/#installation

2. Create a `.env` file with your GitHub token:

```bash
GITHUB_TOKEN=your_github_token_here
```

3. Start the servers:

```bash
deno task start
```

## Usage

1. Place your log files in the `/logs` directory
2. Send a POST request to `http://localhost:8000/diagnose-error` with:

```json
{
  "fileUri": "app.log"
}
```

3. The system will:
   - Check server status
   - Analyze the log file
   - Provide diagnostic suggestions
   - Optionally create GitHub issues

## Development

To run the servers individually:

```bash
deno run --allow-net --allow-read --allow-env src/servers/a/index.ts
deno run --allow-net --allow-read --allow-env src/servers/b/index.ts
deno run --allow-net --allow-read --allow-env src/servers/c/index.ts
```
