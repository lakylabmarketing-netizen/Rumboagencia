#!/usr/bin/env bash
# Instalador de JARVIS (Linux/macOS/Debian-Ubuntu).
set -e
command -v apt-get >/dev/null && sudo apt-get install -y portaudio19-dev espeak python3-venv
python3 -m venv venv
. venv/bin/activate
pip install -U pip setuptools wheel
pip install -r requirements.txt
echo
echo "Falta el modelo de voz: descargalo de https://alphacephei.com/vosk/models"
echo "y copia su contenido en vosk_speech_engine/model"
echo "Luego: . venv/bin/activate && python jarvis.py"
