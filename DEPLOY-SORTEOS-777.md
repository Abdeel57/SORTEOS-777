# 🚀 Guía de Deploy - Sorteos 777

Esta guía te ayudará a desplegar la aplicación **Sorteos 777** en producción.

---

## 📋 Requisitos Previos

- ✅ Cuenta en [Railway.app](https://railway.app) para el backend
- ✅ Cuenta en [Netlify](https://netlify.com) para el frontend
- ✅ Repositorio en GitHub con el código
- ✅ Base de datos PostgreSQL (puede crearse en Railway)

---

## 🗄️ Paso 1: Configurar Base de Datos

### Opción A: Crear Base de Datos en Railway (Recomendado)

1. Ve a [Railway.app](https://railway.app) e inicia sesión
2. Crea un **nuevo proyecto**
3. Click en **"+ New"** → **"Database"** → **"Add PostgreSQL"**
4. Railway creará automáticamente la base de datos
5. **Copia la URL de conexión** (DATABASE_URL) - la necesitarás después

### Opción B: Usar Base de Datos Externa

Si ya tienes una base de datos PostgreSQL, copia su URL de conexión.

**Formato de URL:**
```
postgresql://usuario:password@host:puerto/database
```

---

## 🔧 Paso 2: Configurar Backend en Railway

### 2.1 Crear Servicio Backend

1. En tu proyecto de Railway, click **"+ New"** → **"GitHub Repo"**
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio con el código de Sorteos 777
4. Railway detectará automáticamente que es un proyecto Node.js

### 2.2 Configurar Root Directory

1. En tu servicio backend, ve a **Settings**
2. Busca **"Root Directory"**
3. Cambia a: `backend`
4. **Save**

### 2.3 Configurar Variables de Entorno

Ve a **Variables** en Railway y agrega las siguientes variables:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu-secreto-jwt-unico-y-seguro-aqui
CORS_ORIGINS=https://sorteos777.netlify.app,https://sorteos777.com,https://www.sorteos777.com
```

**Notas importantes:**
- `DATABASE_URL`: Si creaste la BD en Railway, Railway la conectará automáticamente
- `JWT_SECRET`: Genera un secreto único y seguro (puedes usar: `openssl rand -hex 32`)
- `CORS_ORIGINS`: Agrega todos los dominios donde estará el frontend (separados por comas)

### 2.4 Verificar Build y Start Commands

Railway debería detectar automáticamente los comandos desde `railway.json`, pero verifica:

**Build Command:**
```bash
cd backend && npm install && npx prisma generate && npx nest build
```

**Start Command:**
```bash
cd backend && npm run start:prod
```

### 2.5 Ejecutar Migraciones

Después del primer deploy, ejecuta las migraciones:

1. En Railway, ve a tu servicio backend
2. Ve a **Settings** → **Deploy**
3. Busca **"Run Command"** o usa la terminal
4. Ejecuta:
   ```bash
   cd backend && npx prisma migrate deploy
   ```

### 2.6 Crear Usuario Administrador

1. En Railway, abre la terminal del servicio
2. Ejecuta:
   ```bash
   cd backend
   node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
   ```

**O desde tu máquina local:**
```bash
cd backend
node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

### 2.7 Obtener URL del Backend

1. En Railway, ve a tu servicio backend
2. Ve a **Settings** → **Networking**
3. Click en **"Generate Domain"** o configura un dominio personalizado
4. Railway te dará una URL como: `https://sorteos777-backend.up.railway.app`
5. **Copia esta URL** - la necesitarás para el frontend

**Verifica que funciona:**
Abre en tu navegador: `https://tu-backend.up.railway.app/api/health`

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": ...
}
```

---

## 🌐 Paso 3: Configurar Frontend en Netlify

### 3.1 Conectar Repositorio

1. Ve a [Netlify](https://netlify.com) e inicia sesión
2. Click en **"Add new site"** → **"Import an existing project"**
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio de Sorteos 777

### 3.2 Configurar Build Settings

Netlify debería detectar automáticamente la configuración desde `netlify.toml`, pero verifica:

**Base directory:** `frontend`
**Build command:** `npm run build:netlify`
**Publish directory:** `frontend/dist`

### 3.3 Configurar Variables de Entorno

1. En Netlify, ve a **Site settings** → **Environment variables**
2. Agrega la siguiente variable:

```
Key: VITE_API_URL
Value: https://TU-BACKEND-RAILWAY.up.railway.app/api
```

**⚠️ IMPORTANTE:** Reemplaza `TU-BACKEND-RAILWAY` con la URL real de tu backend en Railway.

### 3.4 Actualizar netlify.toml

Edita el archivo `netlify.toml` en la raíz del proyecto y `frontend/netlify.toml`:

Reemplaza todas las instancias de `TU-BACKEND-RAILWAY` con la URL real de tu backend.

**Ejemplo:**
```toml
VITE_API_URL = "https://sorteos777-backend.up.railway.app/api"
```

Y en los redirects:
```toml
to = "https://sorteos777-backend.up.railway.app/api/:splat"
```

### 3.5 Hacer Deploy

1. Click en **"Deploy site"**
2. Netlify comenzará el proceso de build
3. Una vez completado, tendrás una URL temporal como: `https://sorteos777-abc123.netlify.app`

### 3.6 Configurar Dominio Personalizado (Opcional)

1. En Netlify, ve a **Domain settings**
2. Click en **"Add custom domain"**
3. Ingresa tu dominio: `sorteos777.com`
4. Sigue las instrucciones para configurar los DNS

---

## ✅ Paso 4: Verificar Configuración

### 4.1 Verificar Backend

- ✅ Health check funciona: `https://tu-backend.up.railway.app/api/health`
- ✅ Migraciones ejecutadas
- ✅ Usuario admin creado
- ✅ CORS configurado correctamente

### 4.2 Verificar Frontend

- ✅ Frontend carga correctamente
- ✅ Puedes acceder al panel admin: `https://tu-sitio.netlify.app/#/admin`
- ✅ Puedes iniciar sesión con el usuario admin
- ✅ Las peticiones al API funcionan

### 4.3 Verificar Conexión Frontend-Backend

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Verifica que las peticiones a `/api/*` se hagan correctamente
5. No deberían aparecer errores de CORS

---

## 🔒 Paso 5: Configuración de Seguridad

### 5.1 Cambiar Contraseña del Admin

1. Accede al panel admin: `https://tu-sitio.netlify.app/#/admin`
2. Ve a la sección de usuarios
3. Cambia la contraseña del usuario admin por una más segura

### 5.2 Verificar Variables de Entorno

Asegúrate de que todas las variables de entorno estén configuradas correctamente:

**Railway (Backend):**
- ✅ `DATABASE_URL` - URL de la base de datos
- ✅ `JWT_SECRET` - Secreto único y seguro
- ✅ `CORS_ORIGINS` - Dominios permitidos
- ✅ `NODE_ENV=production`

**Netlify (Frontend):**
- ✅ `VITE_API_URL` - URL del backend

---

## 📝 Checklist Final

### Backend (Railway)
- [ ] Proyecto creado en Railway
- [ ] Repositorio conectado
- [ ] Root Directory configurado como `backend`
- [ ] Base de datos creada y conectada
- [ ] Variables de entorno configuradas
- [ ] Migraciones ejecutadas
- [ ] Usuario admin creado
- [ ] Dominio público generado
- [ ] Health check funciona
- [ ] CORS configurado correctamente

### Frontend (Netlify)
- [ ] Repositorio conectado
- [ ] Build settings configurados
- [ ] Variable `VITE_API_URL` configurada
- [ ] `netlify.toml` actualizado con URL del backend
- [ ] Deploy completado exitosamente
- [ ] Dominio personalizado configurado (si aplica)
- [ ] Panel admin accesible
- [ ] Conexión con backend funciona

---

## 🆘 Solución de Problemas

### Error: "Cannot find module" en Railway

**Solución:**
- Verifica que el **Root Directory** esté configurado como `backend`
- Verifica que el **Build Command** incluya `cd backend`

### Error: "Prisma Client not generated"

**Solución:**
- Asegúrate de que el build command incluya: `npx prisma generate`
- Verifica que `DATABASE_URL` esté configurada

### Error: "Database connection failed"

**Solución:**
- Verifica que la base de datos esté activa
- Verifica que `DATABASE_URL` sea correcta
- Si la BD está en Railway, Railway debería conectarla automáticamente

### Error de CORS en el navegador

**Solución:**
- Verifica que `CORS_ORIGINS` en Railway incluya la URL de tu frontend
- Asegúrate de que no haya espacios en la lista de orígenes
- Verifica que los dominios estén en el formato correcto (con `https://`)

### El frontend no se conecta al backend

**Solución:**
1. Verifica que `VITE_API_URL` esté configurada en Netlify
2. Verifica que la URL del backend sea correcta
3. Verifica que el backend esté funcionando (health check)
4. Revisa la consola del navegador para ver errores específicos

### El build falla en Netlify

**Solución:**
- Verifica que el **Base directory** sea `frontend`
- Verifica que el **Build command** sea `npm run build:netlify`
- Revisa los logs de build en Netlify para ver el error específico

---

## 🔗 URLs Importantes

- **Railway Dashboard**: https://railway.app/dashboard
- **Netlify Dashboard**: https://app.netlify.com
- **Backend Health Check**: `https://tu-backend.up.railway.app/api/health`
- **Frontend**: `https://tu-sitio.netlify.app`
- **Panel Admin**: `https://tu-sitio.netlify.app/#/admin`

---

## 💡 Tips

1. **Railway es gratuito** para empezar (con límites)
2. **Netlify es gratuito** para sitios estáticos
3. **Los deploys son automáticos** cuando haces push a GitHub
4. **Railway conecta automáticamente** la base de datos si está en el mismo proyecto
5. **Puedes hacer rollback** fácilmente desde los dashboards

---

## 📞 Soporte

Si tienes problemas durante el deploy:

1. Revisa los logs en Railway y Netlify
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que las migraciones se hayan ejecutado
4. Verifica que el usuario admin se haya creado correctamente

---

¡Listo! Tu aplicación **Sorteos 777** debería estar funcionando en producción. 🚀

