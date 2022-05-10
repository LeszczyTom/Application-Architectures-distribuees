WebService for Speech to text transcription (ASR)

npm init

npm install express

npm install dotenv

npm install --save @google-cloud/speech

Request:
- URL: http://pedago.univ-avignon.fr:3147/speechToText
- Method: POST
- Body (JSON):
{"audioEncoded": "a Large String representing the base64 encoded audio"}

Response:
- Body (JSON):
{"transcription": "a text representing the audio transcription"

SSH to launch service:
ssh uapv2200551@pedago.univ-avignon.fr
cd WebServiceASR
node WebServiceASR.js