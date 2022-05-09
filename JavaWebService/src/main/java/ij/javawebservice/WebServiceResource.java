package ij.javawebservice;

import ij.javawebservice.NLP.NLP;
import jakarta.ws.rs.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Path("/")
public class WebServiceResource {


    @GET
    @Path("test")
    @Produces("text/plain")
    public String hello() {
        return "WebService is running...";
    }

    @HeaderParam("fileName")
    private String fileName;

    @POST
    @Path("saveAudioFile")
    @Consumes("application/octet-stream")
    @Produces("text/plain")

    public String saveAudioFile(byte[] audioBytes) {

        String response = "null";
        String directoryPath = "C:/wamp64/www/audio/";
        java.nio.file.Path path = Paths.get(directoryPath + fileName + ".mp3");
        try {
            Files.write((java.nio.file.Path) path, audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "mp3 upload OK";
    }

    @POST
    @Path("extractNaturalLanguage")
    @Consumes("text/plain")
    @Produces("text/plain")

    public String extractNaturalLanguage(String text) {

        String result = new NLP().coupleActionObjetDepuisPhrase(text).toString();
        System.out.println(result);

        return result;
    }

}

