@echo off
title GYM SYSTEM LAUNCHER
color 0A
echo ===================================================
echo      STARTING GYM PR SYSTEM... PLEASE WAIT
echo ===================================================
echo.

:: 1. Start the Backend (Database Connection)
echo Starting Server...
cd backend
start /min cmd /k "npm start"
cd ..

:: 2. Start the Frontend (The User Interface)
echo Starting Website...
start /min cmd /k "npm run dev"

:: 3. Open the Browser after 5 seconds
echo Launching Google Chrome...
timeout /t 5 >nul
start http://localhost:5173

echo.
echo ===================================================
echo      SYSTEM IS RUNNING! (Don't close this)
echo ===================================================
pause