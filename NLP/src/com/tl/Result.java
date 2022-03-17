package tl;

public class Result {
    String action;
    String objet;

    public Result(String action, String objet) {
        this.action = action;
        this.objet = objet;
    }

    public Result(String action) {
        this.action = action;
    }

    public String toString() {
        return String.format("<%1s, %2s>", action, objet);
    }
}
