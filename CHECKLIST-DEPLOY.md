# ✅ Checklist de Deploy - Sorteos 777

Usa este checklist para asegurarte de que todo esté listo antes del deploy.

---

## 📋 Pre-Deploy

### Configuración Local
- [ ] `config-cliente.json` actualizado con datos reales de Sorteos 777
- [ ] `databaseUrl` en `config-cliente.json` apunta a la base de datos real
- [ ] Contraseña del admin cambiada a una segura (no usar la del ejemplo)
- [ ] `backend/.env` creado y configurado (o se creará automáticamente con `npm run apply:config`)

### Código
- [ ] Dominios de Sorteos 777 agregados en `backend/src/main.ts` ✅ (Ya configurado)
- [ ] `netlify.toml` actualizado (URLs del backend pendientes de actualizar)
- [ ] `frontend/netlify.toml` actualizado (URLs del backend pendientes de actualizar)
- [ ] `package.json` actualizado con nombre del proyecto ✅ (Ya configurado)

---

## 🗄️ Base de Datos

- [ ] Base de datos PostgreSQL creada (Railway, Supabase, o externa)
- [ ] URL de conexión copiada
- [ ] URL actualizada en `config-cliente.json` o `backend/.env`

---

## 🚂 Backend en Railway

### Configuración Inicial
- [ ] Proyecto creado en Railway
- [ ] Repositorio de GitHub conectado
- [ ] Root Directory configurado como `backend`
- [ ] Base de datos PostgreSQL agregada al proyecto (si se crea en Railway)

### Variables de Entorno
- [ ] `DATABASE_URL` configurada (o conectada automáticamente si está en Railway)
- [ ] `NODE_ENV=production` configurada
- [ ] `PORT=3000` configurada
- [ ] `JWT_SECRET` configurada (secreto único y seguro)
- [ ] `CORS_ORIGINS` configurada con:
  - URL de Netlify (ej: `https://sorteos777-abc123.netlify.app`)
  - Dominio personalizado si aplica (ej: `https://sorteos777.com,https://www.sorteos777.com`)

### Deploy
- [ ] Primer deploy completado
- [ ] Migraciones ejecutadas: `cd backend && npx prisma migrate deploy`
- [ ] Usuario admin creado: `node backend/scripts/create-admin-user.js admin Password123! admin@sorteos777.com "Administrador Sorteos 777"`
- [ ] Health check funciona: `https://tu-backend.up.railway.app/api/health`
- [ ] URL del backend copiada para configurar el frontend

---

## 🌐 Frontend en Netlify

### Configuración Inicial
- [ ] Repositorio de GitHub conectado
- [ ] Base directory configurado como `frontend`
- [ ] Build command: `npm run build:netlify`
- [ ] Publish directory: `frontend/dist`

### Variables de Entorno
- [ ] `VITE_API_URL` configurada con la URL real del backend
  - Ejemplo: `https://sorteos777-backend.up.railway.app/api`

### Archivos de Configuración
- [ ] `netlify.toml` (raíz) actualizado con URL real del backend
- [ ] `frontend/netlify.toml` actualizado con URL real del backend
- [ ] Todas las instancias de `TU-BACKEND-RAILWAY` reemplazadas

### Deploy
- [ ] Primer deploy completado
- [ ] Frontend carga correctamente
- [ ] Panel admin accesible: `https://tu-sitio.netlify.app/#/admin`
- [ ] Puedes iniciar sesión con el usuario admin
- [ ] Las peticiones al API funcionan (revisar consola del navegador)

### Dominio Personalizado (Opcional)
- [ ] Dominio personalizado configurado en Netlify
- [ ] DNS configurado correctamente
- [ ] SSL/HTTPS funcionando

---

## 🔒 Seguridad

- [ ] Contraseña del admin cambiada desde el panel admin
- [ ] `JWT_SECRET` es único y seguro (no el del ejemplo)
- [ ] Variables de entorno no están en el código
- [ ] CORS configurado solo con dominios permitidos

---

## ✅ Verificación Final

### Backend
- [ ] Health check responde: `https://tu-backend.up.railway.app/api/health`
- [ ] API responde correctamente
- [ ] No hay errores en los logs de Railway
- [ ] Base de datos conectada y funcionando

### Frontend
- [ ] Frontend carga sin errores
- [ ] Panel admin accesible y funcional
- [ ] Puedes iniciar sesión
- [ ] Las rifas se cargan correctamente
- [ ] No hay errores de CORS en la consola
- [ ] Las peticiones al API funcionan

### Integración
- [ ] Frontend se conecta correctamente al backend
- [ ] No hay errores en la consola del navegador
- [ ] Las imágenes se cargan correctamente
- [ ] El sistema de pagos funciona (si está configurado)

---

## 📝 Notas Post-Deploy

Después del deploy, documenta:

- [ ] URL del backend: `https://________________.up.railway.app`
- [ ] URL del frontend: `https://________________.netlify.app`
- [ ] URL del dominio personalizado (si aplica): `https://________________`
- [ ] Usuario admin: `________________`
- [ ] Fecha del deploy: `________________`

---

## 🆘 Si Algo Sale Mal

1. Revisa los logs en Railway y Netlify
2. Verifica que todas las variables de entorno estén configuradas
3. Verifica que las migraciones se hayan ejecutado
4. Verifica que el usuario admin se haya creado
5. Revisa la consola del navegador para errores
6. Consulta la [Guía de Deploy Completa](./DEPLOY-SORTEOS-777.md)

---

✅ **¡Todo listo para el deploy!**

