/*
Node WebService for the Google Speech To Text
Author: IJ
Date: 21/04/2022
 */

const express = require('express');
const {createServer} = require("http");
require('dotenv').config({path: __dirname + '/.env'})

const app = express();
// const cors = require('cors');
app.set('port', 3147)

// Parser for post method data
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

const NLPServerURL = 'https://61e0cd3a963948.lhrtunnel.link';

const httpServer = createServer(app);

// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

// define DocumentRoot
// app.use(express.static(__dirname + '/ceriGameAngularApp/dist/ceriGameAngularApp/'));

// --- ROUTES ---

app.get('/test', function (req, res) {
    console.log("test");
    res.send("test ok");
});

app.post('/speechToText', function (req, res) {
    console.log("Speech To Text...");
    transcript(req, res);
});

// Start web server
httpServer.listen(3147, function () {
    console.log('listening on ' + app.get('port'));
});


// --- Functions ----

/* transcribe an encoded audio (base64) to text using Google SpeechToText */
async function transcript(req, res) {
    var audioEncoded = req.body.audioEncoded;

    // const filename = 'C:/Users/utilisateur/Documents/SpeakerRecord/2.mp3';
    const encoding = 'AMR';
    const sampleRateHertz = 8000;
    const languageCode = 'fr-FR';

    const config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        alternativeLanguageCodes: ['es-ES', 'en-US'],
    };
    // const audio = {
    //     content: fs.readFileSync(filename).toString('base64'),
    // };

    const audio = {
        content: audioEncoded,
    };

    const request = {
        config: config,
        audio: audio,
    };

    try{
        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log('Transcription: ', transcription);
        // res.json({"transcription": transcription});
        // test();
        extractNL(transcription, res);

    }catch(error){
        console.log(error);
    }
}

async function extractNL (transcription, response){
    const axios = require('axios');

    const data = transcription;
    // const data = "joue une musique de Coldplay";

    var config = {
        headers: {
            'Content-Length': data.length,
            'Content-Type': 'text/plain'
        },
        responseType: 'text'
    };

    axios.post(NLPServerURL + '/JavaWebService-1.0/extractNaturalLanguage', data, config)
        .then((res) => {
            var textToSend = res.data+"\\"+transcription;
            console.log(textToSend);
            response.send(textToSend);
        }).catch((err) => {
        console.error(err);
    });

}

async function test (){
    const https = require('https');

    https.get(NLPServerURL + '/JavaWebService-1.0/test', (resp) => {
        let data = '';

        // Un morceau de réponse est reçu
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // La réponse complète à été reçue. On affiche le résultat.
        resp.on('end', () => {
            console.log(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}


