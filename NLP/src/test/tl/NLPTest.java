package tl;

import static org.junit.Assert.assertEquals;

public class NLPTest {
    @org.junit.Test
    public void playMusicByTitle() {
        NLP test = new NLP();
        assertEquals( "<Jouer, Come Out and Play>", test.coupleActionObjetDepuisPhrase("Joue Come out and play"));
    }
}