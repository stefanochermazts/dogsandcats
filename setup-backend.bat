@echo off
echo ========================================
echo Setup Backend Laravel - DogsAndCats
echo ========================================

echo.
echo 1. Stopping Laravel server...
taskkill /F /IM php.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo 2. Running migrations...
cd backend
php artisan migrate --force

echo.
echo 3. Seeding database...
php artisan db:seed --force

echo.
echo 4. Starting Laravel server on port 8001...
start /B php artisan serve --host=0.0.0.0 --port=8001

echo.
echo ========================================
echo Backend setup completed!
echo ========================================
echo Backend: http://localhost:8001
echo Frontend: http://localhost:8888
echo.
echo Test API: http://localhost:8001/api/test
echo.

cd ..
pause 