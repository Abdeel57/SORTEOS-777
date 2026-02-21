@echo off
echo ========================================
echo   SORTEOS 777 - Inicio Rapido
echo ========================================
echo.

echo [1/4] Verificando configuracion...
if not exist "config-cliente.json" (
    echo ERROR: No se encontro config-cliente.json
    echo Por favor, crea el archivo con la configuracion del cliente
    pause
    exit /b 1
)

echo [2/4] Verificando backend/.env...
if not exist "backend\.env" (
    echo ADVERTENCIA: No se encontro backend/.env
    echo Ejecutando aplicacion de configuracion...
    call npm run apply:config
    if errorlevel 1 (
        echo ERROR: No se pudo aplicar la configuracion
        pause
        exit /b 1
    )
)

echo [3/4] Instalando dependencias...
call npm run install:all
if errorlevel 1 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo [4/4] Iniciando servidores...
echo.
echo ========================================
echo   Servidores iniciando...
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo   Admin:    http://localhost:5173/#/admin
echo ========================================
echo.

call npm start

pause


