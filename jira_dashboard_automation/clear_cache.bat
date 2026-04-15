@echo off
REM Clear Python cache files

echo Clearing Python cache files...

REM Remove __pycache__ directories
for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d"

REM Remove .pyc files
del /s /q *.pyc 2>nul

REM Remove .pyo files
del /s /q *.pyo 2>nul

echo.
echo Cache cleared successfully!
echo.
echo Now you can run the script again:
echo   python create_dashboards.py --create-filters

@REM Made with Bob
