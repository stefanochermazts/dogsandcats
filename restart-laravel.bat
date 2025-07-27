@echo off
echo Stopping Laravel server...
taskkill /F /IM php.exe 2>nul

echo Running migrations...
cd backend
php artisan migrate --force

echo Starting Laravel server on port 8001...
start /B php artisan serve --host=0.0.0.0 --port=8001

echo Laravel restarted with new migrations!
echo Backend: http://localhost:8001
echo Frontend: http://localhost:8888

cd .. 