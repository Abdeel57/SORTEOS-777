# 🎰 Sorteos 777 - Sistema de Rifas

Sistema completo de gestión de rifas y sorteos para **Sorteos 777**.

---

## 🚀 Inicio Rápido

### 1. Configuración Inicial

1. **Actualiza la configuración del cliente:**
   - Edita `config-cliente.json` con los datos reales
   - **IMPORTANTE:** Actualiza `databaseUrl` con la URL real de PostgreSQL

2. **Aplica la configuración:**
   ```bash
   npm run apply:config
   ```

3. **Instala dependencias:**
   ```bash
   npm run install:all
   ```

4. **Ejecuta migraciones:**
   ```bash
   npm run migrate:deploy
   ```

5. **Crea usuario administrador:**
   ```bash
   node backend/scripts/create-admin-user.js admin TuPassword123! admin@sorteos777.com "Administrador Sorteos 777"
   ```

6. **Inicia la aplicación:**
   ```bash
   npm start
   ```

---

## 📋 Configuración del Cliente

El archivo `config-cliente.json` contiene la configuración básica:

```json
{
  "clientName": "Sorteos 777",
  "domain": "sorteos777.com",
  "databaseUrl": "postgresql://usuario:password@host:puerto/database",
  "admin": {
    "username": "admin",
    "password": "CambiarPassword123!",
    "email": "admin@sorteos777.com",
    "name": "Administrador Sorteos 777"
  }
}
```

**⚠️ IMPORTANTE:** Antes de hacer deploy, actualiza:
- `databaseUrl` con la URL real de PostgreSQL
- `password` del admin con una contraseña segura

---

## 🌐 Deploy a Producción

Para hacer deploy completo, sigue la guía detallada:

📖 **[Ver Guía Completa de Deploy](./DEPLOY-SORTEOS-777.md)**

### Resumen Rápido:

1. **Backend en Railway:**
   - Crea proyecto en Railway
   - Conecta repositorio
   - Configura variables de entorno
   - Ejecuta migraciones
   - Crea usuario admin

2. **Frontend en Netlify:**
   - Conecta repositorio
   - Configura `VITE_API_URL` con la URL del backend
   - Actualiza `netlify.toml` con la URL del backend
   - Deploy

---

## 📁 Estructura del Proyecto

```
SORTEOS 777/
├── backend/          # Backend NestJS
│   ├── src/         # Código fuente
│   ├── prisma/      # Esquema y migraciones
│   └── .env         # Variables de entorno (crear)
├── frontend/        # Frontend React + Vite
│   ├── src/         # Código fuente
│   └── dist/        # Build de producción
├── config-cliente.json  # Configuración del cliente
├── netlify.toml     # Configuración Netlify
└── railway.json     # Configuración Railway
```

---

## 🔧 Comandos Útiles

```bash
# Instalar todas las dependencias
npm run install:all

# Iniciar en desarrollo
npm start

# Build completo
npm run build

# Ejecutar migraciones
npm run migrate:deploy

# Crear backup
npm run backup

# Aplicar configuración del cliente
npm run apply:config
```

---

## 🔐 Variables de Entorno

### Backend (.env)

Crea `backend/.env` con:

```env
DATABASE_URL=postgresql://usuario:password@host:puerto/database
NODE_ENV=development
PORT=3000
JWT_SECRET=tu-secreto-jwt-unico
CORS_ORIGINS=http://localhost:5173
```

### Frontend (.env)

Crea `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📞 Acceso

- **Frontend Local:** http://localhost:5173
- **Backend Local:** http://localhost:3000
- **API Health:** http://localhost:3000/api/health
- **Panel Admin:** http://localhost:5173/#/admin

---

## ✅ Checklist Pre-Deploy

- [ ] `config-cliente.json` actualizado con datos reales
- [ ] `databaseUrl` configurada correctamente
- [ ] Contraseña del admin cambiada a una segura
- [ ] Migraciones ejecutadas
- [ ] Usuario admin creado
- [ ] Backend configurado en Railway
- [ ] Variables de entorno configuradas en Railway
- [ ] Frontend configurado en Netlify
- [ ] `VITE_API_URL` configurada en Netlify
- [ ] `netlify.toml` actualizado con URL del backend
- [ ] CORS configurado correctamente
- [ ] Dominios agregados en `backend/src/main.ts`

---

## 🆘 Problemas Comunes

### Error de conexión a la base de datos
- Verifica que `DATABASE_URL` sea correcta
- Verifica que la base de datos esté activa

### Error de CORS
- Verifica que los dominios estén en `backend/src/main.ts`
- Verifica que `CORS_ORIGINS` incluya el dominio del frontend

### El frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurada
- Verifica que el backend esté funcionando
- Revisa la consola del navegador

---

## 📚 Documentación Adicional

- [Guía de Deploy Completa](./DEPLOY-SORTEOS-777.md)
- [Configurar Nuevo Cliente](./CONFIGURAR-NUEVO-CLIENTE.md)
- [Deploy Backend Railway](./DEPLOY-BACKEND-RAILWAY.md)

---

¡Listo para empezar! 🎉

