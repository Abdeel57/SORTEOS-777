# 🔧 Solución: Error 502 - Backend no responde

## 🔍 Problema Identificado

El backend en Railway está devolviendo un error **502: "Application failed to respond"**. Esto significa que el backend no está funcionando correctamente.

## ✅ Pasos para Solucionar

### 1. Verificar Variables de Entorno en Railway

Ve a tu proyecto en Railway y verifica que estas variables estén configuradas:

**Variables REQUERIDAS:**
- ✅ `DATABASE_URL` - Debe estar conectada automáticamente si la BD está en Railway
- ✅ `JWT_SECRET` - Secreto para tokens JWT (genera uno seguro)
- ✅ `NODE_ENV=production`
- ✅ `PORT=3000` (Railway lo configura automáticamente, pero verifica)

**Cómo verificar:**
1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Selecciona tu proyecto
3. Click en tu servicio **Backend**
4. Ve a la pestaña **Variables**
5. Verifica que todas las variables estén configuradas

### 2. Generar JWT_SECRET

Si no tienes `JWT_SECRET` configurado, genera uno:

**En Windows PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**O usa este comando:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**O simplemente usa este valor (cámbialo por uno único):**
```
sorteos777_jwt_secret_2024_production_secure_key_12345
```

### 3. Verificar Logs del Backend

1. En Railway, ve a tu servicio Backend
2. Click en la pestaña **Deployments** o **Logs**
3. Revisa los logs para ver errores específicos

**Errores comunes:**
- ❌ "Cannot find module" → Falta instalar dependencias
- ❌ "Database connection failed" → `DATABASE_URL` incorrecta
- ❌ "JWT_SECRET is required" → Falta configurar `JWT_SECRET`
- ❌ "Port already in use" → Conflicto de puerto

### 4. Verificar que el Build se Complete Correctamente

1. En Railway, ve a **Deployments**
2. Verifica que el último deploy haya sido exitoso (✅ verde)
3. Si hay un error (❌ rojo), haz click para ver los detalles

### 5. Verificar Root Directory

1. En Railway, ve a tu servicio Backend
2. Click en **Settings**
3. Verifica que **Root Directory** esté configurado como: `backend`
4. Si no, cámbialo y guarda

### 6. Verificar Build y Start Commands

En Railway, verifica que los comandos sean:

**Build Command:**
```bash
cd backend && npm install && npx prisma generate && npx nest build
```

**Start Command:**
```bash
cd backend && npm run start:prod
```

### 7. Reiniciar el Servicio

Si todo está configurado correctamente pero sigue sin funcionar:

1. En Railway, ve a tu servicio Backend
2. Click en los **3 puntos** (⋯) → **Restart**
3. Espera a que se reinicie y verifica los logs

### 8. Verificar que las Migraciones se Hayan Ejecutado

Si el backend inicia pero falla al conectarse a la BD:

1. En Railway, ve a tu servicio Backend
2. Click en **Terminal** o **Shell**
3. Ejecuta:
   ```bash
   cd backend && node .\node_modules\prisma\build\index.js migrate deploy
   ```

## 🔍 Verificación Final

Una vez que hayas aplicado las correcciones:

1. Espera 1-2 minutos para que Railway reinicie el servicio
2. Verifica el health check:
   ```
   https://sorteos-777-production.up.railway.app/api/health
   ```
3. Deberías ver:
   ```json
   {
     "status": "ok",
     "timestamp": "...",
     "uptime": ...
   }
   ```

## 📋 Checklist de Variables de Entorno

Asegúrate de tener estas variables en Railway:

- [ ] `DATABASE_URL` - Conectada automáticamente o configurada manualmente
- [ ] `JWT_SECRET` - Secreto único y seguro
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (opcional, Railway lo configura automáticamente)
- [ ] `CORS_ORIGINS` (opcional, pero recomendado para producción)

## 🆘 Si el Problema Persiste

1. **Revisa los logs completos** en Railway
2. **Verifica que el código esté actualizado** en GitHub
3. **Asegúrate de que Railway esté conectado** al repositorio correcto
4. **Verifica que la base de datos esté activa** y accesible

## 📞 Información Útil

- **Railway Dashboard**: https://railway.app/dashboard
- **Backend URL**: https://sorteos-777-production.up.railway.app
- **Health Check**: https://sorteos-777-production.up.railway.app/api/health

---

Una vez que el backend responda correctamente, el login del administrador debería funcionar. 🚀


