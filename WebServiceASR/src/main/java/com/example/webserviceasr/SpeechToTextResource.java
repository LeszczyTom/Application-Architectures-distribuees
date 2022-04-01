package com.example.webserviceasr;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/test")
public class SpeechToTextResource {
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Heyyyyyyy!";
    }
}