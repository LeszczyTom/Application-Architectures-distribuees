package com.tl;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;
import java.text.Normalizer;

class NLP {

    private final List <String> keywords;

    public NLP() {
        keywords = getKeywords();
    }

    /**
     * https://stackoverflow.com/a/15190787
     */
    public static String stripAccents(String s)
    {
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        s = s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        return s;
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
        // - Caractères spéciaux, majuscules -> minuscules puis tokenisation
        String[] tokens = stripAccents(phraseEntree).replaceAll("[^a-zA-Z0-9]+", " ").toLowerCase().split(" ");

        String action = getAction(tokens);
        if(action != null) {
            res.addAction(action);
            res.addObjet(getObject(tokens, res.getAction()));
            return res;
        }
        res.addAction(getOtherAction(tokens));
        return res;
    }

    public String getAction(String[] tokens) {
        return switch (tokens[0]) {
            case "joue" -> "play";
            case "pause" -> "pause";
            case "baisse" -> "volumedown";
            case "reprend" -> "resume";
            case "monte" -> "volumeup";
            case "passe", "suivant" -> "forward";
            case "revient", "precedent" -> "backward";
            case "stop", "arrete" -> "stop";
            default -> null;
        };
    }

    public String getOtherAction(String[] tokens) {
        if(tokens[0].equals("met") && tokens[1].equals("en") && tokens[2].equals("boucle")) return "shuffle";
        String prec = tokens[0];
        for(String token : tokens) {
            if(prec.equals("aime")) {
                if (token.equals("pas")) return "dislike";
                return "like";
            }
            prec = token;
        }
        if (prec.equals("aime")) return "like";
        return null;
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
        if(result.charAt(result.length() - 1) == 32) result.deleteCharAt(result.length() - 1);
        return result.toString();
    }
}