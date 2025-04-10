# 🚀 TODO.scale.md — Escalado profesional del MCP Agent

## 🧱 Entornos
- [ ] Definir entorno por variable (`ENV=development | production | test`)
- [ ] Crear archivos `.env.development`, `.env.production`, `.env.test`
- [ ] Cargar variables según entorno actual
- [ ] Proteger configuración crítica con validación (ej. PORT, TOKEN)

## 🪵 Logging inteligente
- [ ] Implementar logger centralizado (ej: consola en dev, JSON en prod)
- [ ] Añadir niveles: `debug`, `info`, `warn`, `error`
- [ ] Colorear logs en desarrollo
- [ ] Guardar logs críticos en archivos `.log`

### ✅ Testing real
- [ ] Configurar pruebas con Deno nativo (`deno test`)
- [ ] Mockear requests HTTP/JSON-RPC
- [ ] Añadir tests unitarios para:
  - [ ] Controladores (ej. `getLogFile`)
  - [ ] Handlers JSON-RPC
  - [ ] Utilidades comunes
- [ ] Añadir tests e2e para endpoints `/rpc` y `/logs/:file`

### 🧹 Extras útiles
- [ ] Task `deno task dev` para iniciar servidor en modo desarrollo con logs
- [ ] Lint + format automático en CI (`deno lint`, `deno fmt`)
- [ ] Task `deno task test` para ejecutar pruebas rápido

## 📦 Modularización
- [ ] Crear un paquete reusables para manejar JSON-RPC
- [ ] Refactorizar controladores en clases o servicios

## 🔒 Seguridad
- [ ] Validar y sanitizar URIs (evitar LFI)
- [ ] Añadir autenticación por token a endpoints HTTP
- [ ] Usar HTTPS en despliegue (AutoCert o nginx)

## 📁 Data Sources
- [ ] Soporte para PostgreSQL como recurso (`pg://`)
- [ ] Integrar Google Drive como resource server remoto
- [ ] Adaptador S3 o supabase.storage

## 🧠 IA Integración
- [ ] Conectar Claude Desktop al client
- [ ] Enviar contexto multi-server a modelo LLM
- [ ] Agregar memory server temporal (vector o cache)

## ☁️ Despliegue
- [ ] Preparar Dockerfile para cada server
- [ ] Automatizar inicio con `deno task` + `make`
- [ ] Hosting en Render, Railway o Vercel edge

## 📈 Observabilidad
- [ ] Integrar logs con Pino + Pretty
- [ ] Panel de administración de llamadas JSON-RPC
