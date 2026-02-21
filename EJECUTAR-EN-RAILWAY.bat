@echo off
echo ========================================
echo   Ejecutar Comandos en Railway
echo ========================================
echo.

REM Verificar si Railway CLI esta instalado
railway --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Railway CLI no esta instalado
    echo.
    echo Ejecuta primero: INSTALAR-RAILWAY-CLI.bat
    echo.
    pause
    exit /b 1
)

echo Verificando conexion a Railway...
railway whoami >nul 2>&1
if errorlevel 1 (
    echo.
    echo No estas logueado en Railway
    echo Ejecutando: railway login
    echo.
    railway login
    if errorlevel 1 (
        echo ERROR: No se pudo iniciar sesion
        pause
        exit /b 1
    )
)

echo.
echo Verificando proyecto vinculado...
railway status >nul 2>&1
if errorlevel 1 (
    echo.
    echo No hay proyecto vinculado
    echo Ejecutando: railway link
    echo.
    railway link
    if errorlevel 1 (
        echo ERROR: No se pudo vincular el proyecto
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Opciones:
echo ========================================
echo.
echo 1. Ejecutar migraciones
echo 2. Crear usuario administrador
echo 3. Ambos (migraciones + admin)
echo 4. Salir
echo.
set /p OPCION="Selecciona una opcion (1-4): "

if "%OPCION%"=="1" goto MIGRACIONES
if "%OPCION%"=="2" goto ADMIN
if "%OPCION%"=="3" goto AMBOS
if "%OPCION%"=="4" exit /b 0

echo Opcion invalida
pause
exit /b 1

:MIGRACIONES
echo.
echo [1/1] Ejecutando migraciones...
railway run --service backend npx prisma migrate deploy
if errorlevel 1 (
    echo ERROR: Las migraciones fallaron
    pause
    exit /b 1
)
echo.
echo Migraciones completadas exitosamente!
pause
exit /b 0

:ADMIN
echo.
set /p ADMIN_USER="Usuario admin (default: admin): "
if "%ADMIN_USER%"=="" set ADMIN_USER=admin

set /p ADMIN_PASS="Contraseña del admin: "
if "%ADMIN_PASS%"=="" (
    echo ERROR: La contraseña es requerida
    pause
    exit /b 1
)

set /p ADMIN_EMAIL="Email del admin (default: admin@sorteos777.com): "
if "%ADMIN_EMAIL%"=="" set ADMIN_EMAIL=admin@sorteos777.com

set /p ADMIN_NAME="Nombre del admin (default: Administrador Sorteos 777): "
if "%ADMIN_NAME%"=="" set ADMIN_NAME=Administrador Sorteos 777

echo.
echo [1/1] Creando usuario administrador...
railway run --service backend node scripts/create-admin-user.js %ADMIN_USER% %ADMIN_PASS% %ADMIN_EMAIL% "%ADMIN_NAME%"
if errorlevel 1 (
    echo ERROR: No se pudo crear el usuario admin
    pause
    exit /b 1
)
echo.
echo Usuario administrador creado exitosamente!
pause
exit /b 0

:AMBOS
echo.
echo [1/2] Ejecutando migraciones...
railway run --service backend npx prisma migrate deploy
if errorlevel 1 (
    echo ERROR: Las migraciones fallaron
    pause
    exit /b 1
)

echo.
set /p ADMIN_USER="Usuario admin (default: admin): "
if "%ADMIN_USER%"=="" set ADMIN_USER=admin

set /p ADMIN_PASS="Contraseña del admin: "
if "%ADMIN_PASS%"=="" (
    echo ERROR: La contraseña es requerida
    pause
    exit /b 1
)

set /p ADMIN_EMAIL="Email del admin (default: admin@sorteos777.com): "
if "%ADMIN_EMAIL%"=="" set ADMIN_EMAIL=admin@sorteos777.com

set /p ADMIN_NAME="Nombre del admin (default: Administrador Sorteos 777): "
if "%ADMIN_NAME%"=="" set ADMIN_NAME=Administrador Sorteos 777

echo.
echo [2/2] Creando usuario administrador...
railway run --service backend node scripts/create-admin-user.js %ADMIN_USER% %ADMIN_PASS% %ADMIN_EMAIL% "%ADMIN_NAME%"
if errorlevel 1 (
    echo ERROR: No se pudo crear el usuario admin
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Proceso completado exitosamente!
echo ========================================
echo.
echo Credenciales del admin:
echo   Usuario: %ADMIN_USER%
echo   Contraseña: %ADMIN_PASS%
echo   Email: %ADMIN_EMAIL%
echo.
pause
exit /b 0


