@echo off
echo Starting My_OS Web Desktop...
echo.

cd /d "%~dp0server"

echo Checking Node.js installation...
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Installing...
    winget install OpenJS.NodeJS
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Node.js automatically
        echo Please install Node.js from https://nodejs.org/
        pause
        exit /b 1
    )
)

echo ✅ Node.js is available
echo.

echo Installing dependencies (if needed)...
"C:\Program Files\nodejs\npm.cmd" install

echo.
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
echo 🌐 Open your browser and visit: http://localhost:3000
echo 🔐 You'll see the login page
echo 📝 Click "Create one" to register a new user
echo 🏠 After login, you'll access the desktop environment
echo.

"C:\Program Files\nodejs\node.exe" server.js

pause
