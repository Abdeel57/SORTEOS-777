# 🚀 Guía: Ejecutar Migraciones y Crear Usuario Admin

Esta guía te ayudará a ejecutar las migraciones de la base de datos y crear el usuario administrador después del primer deploy en Railway.

---

## 📋 Requisitos Previos

- ✅ Backend desplegado en Railway
- ✅ Base de datos PostgreSQL conectada
- ✅ Variables de entorno configuradas en Railway
- ✅ Primer deploy completado exitosamente

---

## 🔧 Opción 1: Railway CLI (Recomendado - Más Fácil)

**⚠️ IMPORTANTE:** Railway ya no tiene terminal en la web. Usa Railway CLI desde tu computadora.

### Paso 1: Instalar Railway CLI

**En Windows (PowerShell):**
```powershell
iwr https://railway.app/install.ps1 | iex
```

**O con npm:**
```bash
npm install -g @railway/cli
```

### Paso 2: Iniciar Sesión y Conectar

```bash
railway login
railway link
```

Selecciona tu proyecto **Sorteos 777** cuando te lo pida.

### Paso 3: Ejecutar Migraciones

```bash
railway run --service backend npx prisma migrate deploy
```

**Resultado esperado:**
```
✅ Migraciones aplicadas exitosamente
```

### Paso 4: Crear Usuario Administrador

```bash
railway run --service backend node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

**⚠️ IMPORTANTE:** Reemplaza `TuPasswordSeguro123!` con una contraseña segura de tu elección.

**Resultado esperado:**
```
🔐 Creando usuario administrador...
   Usuario: admin
   Email: admin@sorteos777.com
   Nombre: Administrador Sorteos 777
✅ Usuario administrador creado exitosamente!
```

**📖 Guía Completa:** Consulta `EJECUTAR-COMANDOS-RAILWAY.md` para más detalles y métodos alternativos.

---

## 💻 Opción 2: Desde tu Máquina Local

Si prefieres hacerlo desde tu computadora local, necesitas tener acceso a la base de datos.

### Paso 1: Configurar Conexión Local

1. Obtén la `DATABASE_URL` de Railway:
   - Ve a Railway → Tu proyecto → Base de datos → Variables
   - Copia el valor de `DATABASE_URL`

2. Crea o actualiza `backend/.env` localmente:
   ```env
   DATABASE_URL=postgresql://usuario:password@host:puerto/database
   ```

### Paso 2: Ejecutar Migraciones

Abre una terminal en tu computadora y ejecuta:

```bash
cd "C:\Users\Admin\Desktop\Rifas\SORTEOS 777\backend"
npx prisma migrate deploy
```

### Paso 3: Crear Usuario Administrador

En la misma terminal:

```bash
node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

---

## 🎯 Opción 3: Script Automatizado (Más Fácil)

He creado un script que hace todo automáticamente. Solo necesitas tener la `DATABASE_URL` configurada.

### Desde Railway:

1. Abre la terminal de Railway
2. Ejecuta:
   ```bash
   cd backend
   npm run migrate:deploy
   node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
   ```

### Desde tu máquina local:

1. Asegúrate de que `backend/.env` tenga la `DATABASE_URL` correcta
2. Ejecuta el script:
   ```bash
   cd backend
   npm run migrate:deploy
   node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
   ```

---

## ✅ Verificación

### Verificar Migraciones

Después de ejecutar las migraciones, verifica que todo esté bien:

```bash
cd backend
npx prisma migrate status
```

Deberías ver todas las migraciones como "Applied".

### Verificar Usuario Admin

1. Accede al frontend (local o en Netlify)
2. Ve a: `http://localhost:5173/#/admin` (local) o `https://tu-sitio.netlify.app/#/admin` (producción)
3. Intenta iniciar sesión con:
   - **Usuario:** `admin`
   - **Contraseña:** La que configuraste

---

## 🆘 Solución de Problemas

### Error: "Cannot find module '@prisma/client'"

**Solución:**
```bash
cd backend
npm install
npx prisma generate
```

### Error: "Database connection failed"

**Solución:**
1. Verifica que `DATABASE_URL` esté correcta en Railway
2. Verifica que la base de datos esté activa
3. Verifica que el firewall permita conexiones desde Railway

### Error: "Migration already applied"

**Solución:**
Esto es normal si las migraciones ya se ejecutaron. Puedes continuar con crear el usuario admin.

### Error: "User already exists"

**Solución:**
El usuario admin ya existe. Puedes:
1. Usar otro username
2. O eliminar el usuario existente desde el panel admin (si ya tienes acceso)

### Error: "Permission denied" en Railway

**Solución:**
Asegúrate de estar en el directorio correcto:
```bash
cd backend
pwd  # Debería mostrar: /app/backend
```

---

## 📝 Comandos Completos (Copia y Pega)

### Para Railway Terminal:

```bash
# 1. Ir al directorio backend
cd backend

# 2. Ejecutar migraciones
npx prisma migrate deploy

# 3. Crear usuario admin (reemplaza la contraseña)
node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

### Para Máquina Local:

```bash
# 1. Ir al directorio del proyecto
cd "C:\Users\Admin\Desktop\Rifas\SORTEOS 777\backend"

# 2. Verificar que .env tenga DATABASE_URL
# (Edita backend/.env si es necesario)

# 3. Ejecutar migraciones
npx prisma migrate deploy

# 4. Crear usuario admin (reemplaza la contraseña)
node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

---

## 🎉 ¡Listo!

Una vez completados estos pasos:

1. ✅ Base de datos configurada con todas las tablas
2. ✅ Usuario administrador creado
3. ✅ Puedes acceder al panel admin

**Próximo paso:** Configurar el frontend en Netlify y conectarlo con el backend.

---

## 📞 Notas Importantes

- **Guarda la contraseña del admin** en un lugar seguro
- **No uses contraseñas débiles** en producción
- **El usuario admin tiene acceso completo** al sistema
- **Puedes crear más usuarios** desde el panel admin después

---

¿Necesitas ayuda con algún paso? Revisa la sección de solución de problemas o consulta la guía completa en `DEPLOY-SORTEOS-777.md`.

