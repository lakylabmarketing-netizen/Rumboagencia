@echo off
REM Instalador de JARVIS (Windows). Requiere Python 3.7+ de 64 bits en el PATH.
python -m venv venv
call venv\Scripts\activate.bat
python -m pip install -U pip setuptools wheel
pip install -r requirements.txt
if errorlevel 1 (
  echo Si falla pyaudio, descarga el .whl de https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio e instalalo con pip.
)
echo.
echo Falta el modelo de voz: descargalo de https://alphacephei.com/vosk/models
echo y copia su contenido en vosk_speech_engine\model
echo Luego ejecuta: venv\Scripts\activate ^&^& python jarvis.py
