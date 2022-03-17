package tl;

import static org.junit.Assert.assertEquals;

public class NLPTest {
    private final NLP nlp = new NLP();

    @org.junit.Test
    public void playMusic() {
        assertEquals( new Result ("play", "come out and play").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Come out and play").toString());
        assertEquals( new Result ("play", "chelsea dagger").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Chelsea Dagger").toString());
        assertEquals( new Result ("play", "attack").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Attack").toString());
        assertEquals( new Result ("play", "toxicity").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Toxicity").toString());
        assertEquals( new Result ("play", "room on fire").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Room on fire").toString());
        assertEquals( new Result ("play", "the offspring").toString(), nlp.coupleActionObjetDepuisPhrase("Joue The offspring").toString());
        assertEquals( new Result ("play", "reptilia - the strokes").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Reptilia de The Strokes").toString());
        assertEquals( new Result ("play", "come out and play - the offspring").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Come out and play de The offspring").toString());
    }


    @org.junit.Test
    public void pauseMusic() {
        assertEquals( new Result ("pause").toString(), nlp.coupleActionObjetDepuisPhrase("Pause").toString());
    }

    @org.junit.Test
    public void resumeMusic() {
        assertEquals( new Result ("resume").toString(), nlp.coupleActionObjetDepuisPhrase("Reprend la lecture").toString());
    }

    @org.junit.Test
    public void volume() {
        assertEquals( new Result ("volumedown").toString(), nlp.coupleActionObjetDepuisPhrase("Baisse le son").toString());
        assertEquals( new Result ("volumeup").toString(), nlp.coupleActionObjetDepuisPhrase("Monte le son").toString());
    }

    @org.junit.Test
    public void like() {
        Result like = new Result ("like");
        Result dislike = new Result ("dislike");

        assertEquals( like.toString(), nlp.coupleActionObjetDepuisPhrase("J'aime ce morceau").toString());
        assertEquals( dislike.toString(), nlp.coupleActionObjetDepuisPhrase("Je n'aime pas ce morceau").toString());
        assertEquals( like.toString(), nlp.coupleActionObjetDepuisPhrase("J'aime").toString());
        assertEquals( dislike.toString(), nlp.coupleActionObjetDepuisPhrase("Je n'aime pas").toString());
    }

    @org.junit.Test
    public void skipForward() {
        Result skipForward = new Result ("forward");
        assertEquals( skipForward.toString(), nlp.coupleActionObjetDepuisPhrase("Passe ce morceau").toString());
        assertEquals( skipForward.toString(), nlp.coupleActionObjetDepuisPhrase("Suivant").toString());
    }

    @org.junit.Test
    public void skipBackward() {
        Result skipBack = new Result ("backward");
        assertEquals( skipBack.toString(), nlp.coupleActionObjetDepuisPhrase("Revient en arrière").toString());
        assertEquals( skipBack.toString(), nlp.coupleActionObjetDepuisPhrase("Precedent").toString());
    }

    @org.junit.Test
    public void shuffle() {
        assertEquals( new Result ("shuffle").toString(), nlp.coupleActionObjetDepuisPhrase("Met en boucle").toString());
    }

    @org.junit.Test
    public void stopMusic() {
        Result stop = new Result ("stop");
        assertEquals( stop.toString(), nlp.coupleActionObjetDepuisPhrase("Stop").toString());
        assertEquals( stop.toString(), nlp.coupleActionObjetDepuisPhrase("Arrête la musique").toString());
        assertEquals( stop.toString(), nlp.coupleActionObjetDepuisPhrase("Stop la musique").toString());
    }
}