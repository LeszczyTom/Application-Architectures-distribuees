package tl;

class NLP {
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

        return tokens[0];
    }
}