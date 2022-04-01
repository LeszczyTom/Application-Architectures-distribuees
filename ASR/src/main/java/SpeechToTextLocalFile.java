import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.protobuf.ByteString;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.apache.commons.codec.binary.Base64;

/**
 * Transcribe a local audio file into text with Google SpeechToText libraries
 */
public class SpeechToTextLocalFile {

    /** Demonstrates using the Speech API to transcribe an audio file. */
    public static void main(String... args) throws Exception {
        String fileName = "C:/Users/utilisateur/Documents/SpeakerRecord/2.mp3";
        Path path = Paths.get(fileName);
        byte[] audio = Files.readAllBytes(path);
        byte[] encodedAudio = Base64.encodeBase64(audio);

        try (SpeechClient speech = SpeechClient.create()) {
            // Configure request with video media type
            RecognitionConfig recConfig =
                    RecognitionConfig.newBuilder()
                            // encoding may either be omitted or must match the value in the file header
                            .setEncoding(AudioEncoding.ENCODING_UNSPECIFIED)
                            .setLanguageCode("fr-FR")
                            // sample rate hertz may be either be omitted or must match the value in the file
                            // header
                            .setSampleRateHertz(16000)
                            //.setModel("audio")
                            .build();

            RecognitionAudio recognitionAudio =
                    RecognitionAudio.newBuilder().setContent(ByteString.copyFrom(audio)).build();

            RecognizeResponse recognizeResponse = speech.recognize(recConfig, recognitionAudio);
            // Just print the first result here.
            SpeechRecognitionResult result = recognizeResponse.getResultsList().get(0);
            // There can be several alternative transcripts for a given chunk of speech. Just use the
            // first (most likely) one here.
            SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
            System.out.printf("Transcript : %s\n", alternative.getTranscript());
        }
    }
}