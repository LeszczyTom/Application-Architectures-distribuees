# ASR
Implémentation d'un système de reconnaissance de la parole permettant d'extraire depuis le signal de parole le texte associé.

To run the maven project with cmd line:

cd path/to/ASR

mvn clean install

set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\credentials\key.json

mvn exec:java -Dexec.mainClass=SpeechToTextLocalFile