# ⚡ Pasos Rápidos: Migraciones y Admin

## 🎯 Método Más Rápido: Railway CLI

**⚠️ Railway ya no tiene terminal en la web. Usa Railway CLI desde tu computadora.**

### Paso 1: Instalar Railway CLI

Abre PowerShell y ejecuta:
```powershell
iwr https://railway.app/install.ps1 | iex
```

O con npm:
```bash
npm install -g @railway/cli
```

### Paso 2: Login y Conectar

```bash
railway login
railway link
```

Selecciona tu proyecto **Sorteos 777**.

### Paso 3: Ejecutar Migraciones

```bash
railway run --service backend npx prisma migrate deploy
```

Espera a que termine (verás ✅ cuando esté listo).

### Paso 4: Crear Usuario Admin

```bash
railway run --service backend node scripts/create-admin-user.js admin TuPasswordSeguro123! admin@sorteos777.com "Administrador Sorteos 777"
```

**⚠️ Cambia `TuPasswordSeguro123!` por tu contraseña real.**

---

## ✅ Verificación Rápida

Después de ejecutar los comandos, deberías ver:

```
✅ Migraciones aplicadas exitosamente
✅ Usuario administrador creado exitosamente!
```

---

## 🎉 ¡Listo!

Ahora puedes:
- Acceder al panel admin en: `https://tu-sitio.netlify.app/#/admin`
- Usuario: `admin`
- Contraseña: La que configuraste

---

## 📚 Documentación Completa

Para más detalles, consulta: `GUIA-MIGRACIONES-Y-ADMIN.md`

