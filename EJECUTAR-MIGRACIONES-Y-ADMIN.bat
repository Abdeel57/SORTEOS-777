@echo off
echo ========================================
echo   SORTEOS 777 - Migraciones y Admin
echo ========================================
echo.

echo Este script ejecutara:
echo 1. Migraciones de la base de datos
echo 2. Creacion del usuario administrador
echo.

set /p DATABASE_URL="Ingresa la DATABASE_URL de Railway (o presiona Enter para usar backend/.env): "

if "%DATABASE_URL%"=="" (
    echo.
    echo Usando DATABASE_URL de backend/.env...
    if not exist "backend\.env" (
        echo ERROR: No se encontro backend/.env
        echo Por favor, crea el archivo con DATABASE_URL
        pause
        exit /b 1
    )
) else (
    echo.
    echo Actualizando backend/.env con la DATABASE_URL proporcionada...
    echo DATABASE_URL=%DATABASE_URL% > backend\.env.temp
    type backend\.env.temp > backend\.env
    del backend\.env.temp
)

echo.
echo [1/2] Ejecutando migraciones...
cd backend
call npx prisma migrate deploy
if errorlevel 1 (
    echo.
    echo ERROR: Las migraciones fallaron
    cd ..
    pause
    exit /b 1
)

echo.
echo [2/2] Creando usuario administrador...
echo.
set /p ADMIN_USER="Usuario admin (default: admin): "
if "%ADMIN_USER%"=="" set ADMIN_USER=admin

set /p ADMIN_PASS="Contraseña del admin: "
if "%ADMIN_PASS%"=="" (
    echo ERROR: La contraseña es requerida
    cd ..
    pause
    exit /b 1
)

set /p ADMIN_EMAIL="Email del admin (default: admin@sorteos777.com): "
if "%ADMIN_EMAIL%"=="" set ADMIN_EMAIL=admin@sorteos777.com

set /p ADMIN_NAME="Nombre del admin (default: Administrador Sorteos 777): "
if "%ADMIN_NAME%"=="" set ADMIN_NAME=Administrador Sorteos 777

echo.
echo Creando usuario...
call node scripts\create-admin-user.js %ADMIN_USER% %ADMIN_PASS% %ADMIN_EMAIL% "%ADMIN_NAME%"
if errorlevel 1 (
    echo.
    echo ERROR: No se pudo crear el usuario admin
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo   ¡Proceso completado exitosamente!
echo ========================================
echo.
echo Credenciales del admin:
echo   Usuario: %ADMIN_USER%
echo   Contraseña: %ADMIN_PASS%
echo   Email: %ADMIN_EMAIL%
echo.
echo Guarda estas credenciales en un lugar seguro.
echo.
pause


