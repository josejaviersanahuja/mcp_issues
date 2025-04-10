# ✅ TODO.dev.md — Desarrollo base del MCP Agent

## 🧱 Estructura del proyecto
- [x] Crear carpeta `fs-resources` para servidor de recursos
- [x] Modularizar rutas y controladores (`routes/`, `controllers/`)
- [x] Implementar endpoint GET `/logs/:filename`
- [x] Crear `.gitignore` y agregar carpetas sensibles

## 🔌 MCP - JSON-RPC
- [x] Crear endpoint POST `/rpc`
- [x] Manejar método `resources/read`
- [ ] Implementar método `resources/list`

## 🧪 Testing manual
- [x] Probar con `curl` la ruta REST
- [x] Probar con `curl` el endpoint JSON-RPC
- [ ] Documentar comandos curl frecuentes

## ⚙️ Automatización
- [x] Crear task `deno task resources`
- [ ] Crear task para `tools-server`
- [ ] Crear task para `prompts-server`

## 🧹 Mejoras internas
- [ ] Validar MIME types correctamente
- [ ] Normalizar rutas de archivo (evitar escapes)
- [ ] Manejo de errores centralizado y logs
