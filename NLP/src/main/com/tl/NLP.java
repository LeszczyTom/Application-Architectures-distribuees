package com.tl;

import java.util.*;
import java.text.Normalizer;

public class NLP {

    private final String[] prepositions = {"A", "dans", "par", "pour", "vers", "avec", "de", "sans", "sous"};
    private final String[] determiantns = {"du", "de", "un", "une", "le", "la", "l", "les", "des"};

    /**
     * https://stackoverflow.com/a/15190787
     */
    public String stripAccents(String s)
    {
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        s = s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        return s;
    }

    public String[] removeUnwantedWords(String[] tokens) {
        LinkedList<String> tmp = new LinkedList<>(Arrays.asList(tokens));
        tmp.removeAll(Arrays.asList(determiantns));
        tmp.removeAll(Arrays.asList(prepositions));
        return tmp.toArray(new String[0]);
    }

    public Result coupleActionObjetDepuisPhrase(String phraseEntree) {
        Result res = new Result();
        // - Caractères spéciaux, majuscules -> minuscules puis tokenisation
        String[] tokens = stripAccents(phraseEntree).replaceAll("[^a-zA-Z0-9]+", " ").toLowerCase().split(" ");
        tokens = removeUnwantedWords(tokens);
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
        for( String s: tokens){
            if(s.equals("pause")){
                return "pause";
            }
        }
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
        List<String> tmp = new ArrayList<>(Arrays.asList(tokens));
        tmp.remove(0);

        StringBuilder result = new StringBuilder();
        for(String token : tmp) {
            result.append(token);
            result.append(" ");
        }
        if(result.length() != 0 && result.charAt(result.length() - 1) == 32) result.deleteCharAt(result.length() - 1);
        return result.toString();
    }
}