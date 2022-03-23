package com.tl;

public class Main {
    public static void main(String[] args) {
        if(args.length == 0) System.exit(-1);
        System.out.println(new NLP().coupleActionObjetDepuisPhrase(args[0]).toString());
        System.exit(0);
    }
}
