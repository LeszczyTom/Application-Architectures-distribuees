WebService for Speech to text transcription (ASR)

npm init

npm install express

npm install dotenv

npm install --save @google-cloud/speech

Required: get a Google Service json key for using SpeechToText and place it at the root.

To use the service:

Request:
- URL: http://pedago.univ-avignon.fr:3147/speechToText
- Method: POST
- Body (JSON):
{"audioEncoded": "a Large String representing the base64 encoded audio"}

Response:
- Body (JSON):
{"transcription": "a text representing the audio transcription"