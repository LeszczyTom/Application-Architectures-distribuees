package com.tl;

public class Result {
    private String action;
    private String objet;

    public Result() {
        addAction("");
        addObjet("");
    }

    public Result(String action, String objet) {
        addAction(action);
        addObjet(objet);
    }

    public Result(String action) {
        addAction(action);
    }

    public void addAction(String action) {
        this.action = action;
    }

    public void  addObjet(String objet) {
        this.objet = objet;
    }

    public String getAction() {
        return action;
    }

    public String getObet() {
        return objet;
    }

    public String toString() {
        return String.format("<%1s, %2s>", action, objet);
    }
}
