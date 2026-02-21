@echo off
echo ========================================
echo   Instalacion de Railway CLI
echo ========================================
echo.

echo Instalando Railway CLI...
echo.

powershell -Command "iwr https://railway.app/install.ps1 | iex"

if errorlevel 1 (
    echo.
    echo ERROR: No se pudo instalar Railway CLI con PowerShell
    echo.
    echo Intentando con npm...
    call npm install -g @railway/cli
    if errorlevel 1 (
        echo.
        echo ERROR: No se pudo instalar Railway CLI
        echo.
        echo Instalacion manual:
        echo 1. Abre PowerShell como Administrador
        echo 2. Ejecuta: iwr https://railway.app/install.ps1 ^| iex
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Railway CLI instalado exitosamente!
echo ========================================
echo.
echo Proximos pasos:
echo 1. Ejecuta: railway login
echo 2. Ejecuta: railway link
echo 3. Selecciona tu proyecto Sorteos 777
echo.
echo Luego puedes ejecutar:
echo   railway run --service backend npx prisma migrate deploy
echo   railway run --service backend node scripts/create-admin-user.js admin TuPassword123! admin@sorteos777.com "Admin Sorteos 777"
echo.
pause


