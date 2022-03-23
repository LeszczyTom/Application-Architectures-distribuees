package com.tl;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

class NLP {

    private final List <String> keywords;

    public NLP() {
        keywords = getKeywords();
    }

    public List<String> getKeywords() {
        try (Stream<String> stream = Files.lines(Paths.get("NLP/src/Ressources/keywords.txt"))) {
            return stream.toList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    public Result coupleActionObjetDepuisPhrase(String phraseEntree) {
        Result res = new Result();
        // Normalisation en minuscule puis tokenisation
        String[] tokens = phraseEntree.toLowerCase().split(" ");

        res.addAction(getAction(tokens));
        res.addObjet(getObject(tokens, res.getAction()));
        return res;
    }

    public String getAction(String[] tokens) {
        return switch (tokens[0]) {
            case "joue" -> "play";
            case "pause" -> "pause";
            case "baisse" -> "volumedown";
            case "reprend" -> "resume";
            case "monte" -> "volumeup";
            case "passe" -> "forward";
            case "suivant" -> "forward";
            case "revient" -> "backward";
            case "precedent" -> "backward";
            case "stop" -> "stop";
            case "arrete" -> "stop";
            default -> null;
        };
    }

    public String getObject(String[] tokens, String action) {
        if(action == null || !action.equals("play")) return null;
        StringBuilder result = new StringBuilder();
        for(String token : tokens) {
            for (String keyword : keywords) {
                if (token.equals(keyword)) {
                    result.append(keyword);
                    result.append(" ");
                }
            }
        }
        result.delete(result.length() - 1, result.length());
        return result.toString();
    }
}