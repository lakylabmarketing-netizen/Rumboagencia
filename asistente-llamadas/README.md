# Asistente que te llama

Un script que hace que te llame tu asistente al movil con [Twilio](https://www.twilio.com).
Solo llamadas salientes: el asistente te avisa; no conversa por telefono.

## Puesta en marcha (10 min)
1. Crea una cuenta en twilio.com y compra un numero con capacidad de voz (unos 1-2 $/mes).
2. Cuenta de prueba: Twilio solo llama a numeros que verifiques en *Verified Caller IDs*.
   Verifica tu movil ahi.
3. Copia `.env.example` a `.env` y rellena Account SID, Auth Token, tu numero Twilio y tu movil.
4. Prueba sin llamar:  `python llamar.py --prueba "Hola"`
5. Llamada real:       `python llamar.py "Tienes un lead nuevo en Rumbo"`

## Uso desde Claude Code / Jarvis
Dile a tu asistente: "cuando pase X, ejecuta `python asistente-llamadas/llamar.py "mensaje"`".

## Seguridad
`.env` contiene tu token: esta en `.gitignore` y no debe compartirse.
