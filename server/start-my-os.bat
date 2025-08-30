@echo off
title My_OS - Complete Startup
color 0A

echo ========================================
echo          My_OS Complete Startup
echo ========================================
echo Port: 2999
echo URL: http://localhost:2999
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Kill any processes on port 2999
echo 🧹 Cleaning up any existing processes on port 2999...
for /f "tokens=5" %%a in ('netstat -aon ^| find "2999" ^| find "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

REM Kill any Chrome processes
echo 🧹 Closing existing Chrome instances...
taskkill /f /im chrome.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo 🚀 Starting My_OS Server on port 2999...
echo.

REM Start the server in background
start /min "My_OS Server" cmd /c "node server.js"

REM Wait for server to start
echo ⏳ Waiting for server to initialize...
timeout /t 5 /nobreak >nul

REM Check if server started successfully
:CHECK_SERVER
netstat -an | find "2999" >nul
if %errorlevel% neq 0 (
    timeout /t 1 /nobreak >nul
    goto CHECK_SERVER
)

echo ✅ Server is running on port 2999!
echo.

REM Prepare Chrome profile
echo 📁 Preparing Chrome profile...
if exist "temp-chrome-profile" (
    rmdir /s /q "temp-chrome-profile" >nul 2>&1
)
mkdir temp-chrome-profile

echo.
echo 🌐 Starting Chrome with full permissions...
echo 📱 Camera, Screen Share, and all features will be enabled
echo.

REM Start Chrome with comprehensive flags
"C:\Program Files\Google\Chrome\Application\chrome.exe" ^
    --new-window ^
    --unsafely-treat-insecure-origin-as-secure=http://localhost:2999 ^
    --user-data-dir="%cd%\temp-chrome-profile" ^
    --autoplay-policy=no-user-gesture-required ^
    --disable-web-security ^
    --allow-running-insecure-content ^
    --ignore-certificate-errors ^
    --ignore-ssl-errors ^
    --ignore-certificate-errors-spki-list ^
    --disable-extensions ^
    --no-sandbox ^
    --disable-dev-shm-usage ^
    --allow-insecure-localhost ^
    --disable-features=VizDisplayCompositor,TranslateUI ^
    --disable-ipc-flooding-protection ^
    --allow-elevated-browser ^
    --disable-background-timer-throttling ^
    --disable-backgrounding-occluded-windows ^
    --disable-renderer-backgrounding ^
    --start-maximized ^
    http://localhost:2999

if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to start Chrome automatically
    echo 🔧 Manual Chrome command:
    echo "C:\Program Files\Google\Chrome\Application\chrome.exe" --unsafely-treat-insecure-origin-as-secure=http://localhost:2999 --user-data-dir=temp-profile http://localhost:2999
    echo.
    echo 🌐 Or visit: http://localhost:2999
)

echo.
echo ========================================
echo 🎉 My_OS is now running!
echo 📱 All camera and media features enabled
echo 🌐 URL: http://localhost:2999
echo ========================================
echo.
echo Features available:
echo ✅ Camera App - Take photos and videos
echo ✅ Screen Share - Desktop sharing and recording  
echo ✅ Games - Snake and Dino games
echo ✅ File Manager - Browse files
echo ✅ Calculator - Full calculator
echo ✅ Browser - Built-in web browser
echo.
echo Press any key to keep server running...
echo (Server will continue running until you close this window)
pause >nul

echo.
echo 🛑 Shutting down My_OS...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im chrome.exe >nul 2>&1

echo ✅ My_OS stopped successfully
pause
