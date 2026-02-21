# 🔧 Cómo Ejecutar Comandos en Railway (Sin Terminal Web)

Railway ya no tiene terminal en la web. Aquí tienes **3 métodos alternativos** para ejecutar las migraciones y crear el usuario admin.

---

## 🎯 Método 1: Railway CLI (Recomendado - Más Fácil)

Este es el método más fácil. Instala Railway CLI y ejecuta comandos desde tu computadora.

### Paso 1: Instalar Railway CLI

**En Windows (PowerShell):**
```powershell
iwr https://railway.app/install.ps1 | iex
```

**O con npm:**
```bash
npm install -g @railway/cli
```

### Paso 2: Iniciar Sesión

```bash
railway login
```

Esto abrirá tu navegador para autenticarte.

### Paso 3: Conectar a tu Proyecto

```bash
railway link
```

Selecciona tu proyecto **Sorteos 777** cuando te lo pida.

### Paso 4: Ejecutar Migraciones

```bash
railway run --service backend cd backend && npx prisma migrate deploy
```

O si estás en el directorio del proyecto:
```bash
cd "C:\Users\Admin\Desktop\Rifas\SORTEOS 777"
railway run --service backend npx prisma migrate deploy
```

### Paso 5: Crear Usuario Admin

```bash
railway run --service backend node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

**⚠️ Cambia `TuPasswordSeguro123!` por tu contraseña real.**

---

## 💻 Método 2: Desde tu Máquina Local (Conectado a Railway DB)

Si prefieres ejecutar desde tu máquina local, necesitas la `DATABASE_URL` de Railway.

### Paso 1: Obtener DATABASE_URL de Railway

1. Ve a Railway Dashboard
2. Selecciona tu proyecto **Sorteos 777**
3. Click en el servicio **PostgreSQL** (base de datos)
4. Ve a **Variables**
5. Copia el valor de `DATABASE_URL`

### Paso 2: Configurar .env Local

Crea o edita `backend/.env` en tu computadora:

```env
DATABASE_URL=postgresql://usuario:password@host:puerto/database
```

Pega la `DATABASE_URL` que copiaste de Railway.

### Paso 3: Ejecutar Migraciones

Abre PowerShell o CMD en tu computadora:

```bash
cd "C:\Users\Admin\Desktop\Rifas\SORTEOS 777\backend"
npx prisma migrate deploy
```

### Paso 4: Crear Usuario Admin

```bash
node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

---

## 🚀 Método 3: Script Automatizado (Más Fácil)

He creado un script que hace todo automáticamente. Solo necesitas la `DATABASE_URL`.

### Paso 1: Obtener DATABASE_URL

1. Railway → Tu proyecto → PostgreSQL → Variables
2. Copia `DATABASE_URL`

### Paso 2: Ejecutar el Script

Ejecuta el archivo:
```
EJECUTAR-MIGRACIONES-Y-ADMIN.bat
```

El script te pedirá:
- La `DATABASE_URL` (o usará la de `backend/.env` si existe)
- Usuario admin
- Contraseña admin
- Email admin
- Nombre admin

Y ejecutará todo automáticamente.

---

## 📋 Resumen de Comandos por Método

### Método 1: Railway CLI

```bash
# Instalar
npm install -g @railway/cli

# Login y conectar
railway login
railway link

# Ejecutar migraciones
railway run --service backend npx prisma migrate deploy

# Crear admin
railway run --service backend node scripts/create-admin-user.js admin TuPassword123! admin@sorteos777.com "Admin Sorteos 777"
```

### Método 2: Local con DATABASE_URL

```bash
# 1. Configurar backend/.env con DATABASE_URL de Railway
# 2. Ejecutar migraciones
cd backend
npx prisma migrate deploy

# 3. Crear admin
node scripts/create-admin-user.js admin TuPassword123! admin@sorteos777.com "Admin Sorteos 777"
```

### Método 3: Script Automatizado

```bash
# Solo ejecuta:
EJECUTAR-MIGRACIONES-Y-ADMIN.bat
```

---

## ✅ Verificación

Después de ejecutar los comandos, verifica:

1. **Migraciones aplicadas:**
   ```bash
   railway run --service backend npx prisma migrate status
   ```
   O desde local:
   ```bash
   cd backend
   npx prisma migrate status
   ```

2. **Usuario admin creado:**
   - Intenta iniciar sesión en el panel admin
   - URL: `https://tu-sitio.netlify.app/#/admin`
   - Usuario: `admin`
   - Contraseña: La que configuraste

---

## 🆘 Solución de Problemas

### Error: "railway: command not found"

**Solución:**
```bash
npm install -g @railway/cli
```

### Error: "Cannot connect to database"

**Solución:**
- Verifica que `DATABASE_URL` sea correcta
- Verifica que la base de datos esté activa en Railway
- Verifica que no haya firewall bloqueando la conexión

### Error: "Migration already applied"

**Solución:**
Esto es normal si las migraciones ya se ejecutaron. Puedes continuar con crear el usuario admin.

### Error: "User already exists"

**Solución:**
El usuario admin ya existe. Puedes:
- Usar otro username
- O eliminar el usuario existente desde el panel admin (si ya tienes acceso)

---

## 💡 Recomendación

**Para la primera vez:** Usa el **Método 1 (Railway CLI)** - es el más fácil y directo.

**Para uso frecuente:** Usa el **Método 3 (Script)** - solo ejecutas el .bat y listo.

---

¿Necesitas ayuda con algún método específico? ¡Dime cuál prefieres usar!


