package tl;

import static org.junit.Assert.assertEquals;

public class NLPTest {
    private final NLP nlp = new NLP();

    @org.junit.Test
    public void playMusic() {
        assertEquals( new Result ("Play", "Come Out and Play").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Come out and play").toString());
        assertEquals( new Result ("Play", "Chelsea Dagger").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Chelsea Dagger").toString());
        assertEquals( new Result ("Play", "Attack").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Attack").toString());
        assertEquals( new Result ("Play", "Toxicity").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Toxicity").toString());
        assertEquals( new Result ("Play", "Room on fire").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Room on fire").toString());
        assertEquals( new Result ("Play", "The offspring").toString(), nlp.coupleActionObjetDepuisPhrase("Joue The offspring").toString());
        assertEquals( new Result ("Play", "Reptilia - The strokes").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Reptilia de The Strokes").toString());
        assertEquals( new Result ("Play", "Come out and play - The offspring").toString(), nlp.coupleActionObjetDepuisPhrase("Joue Come out and play de The offspring").toString());
    }


    @org.junit.Test
    public void pauseMusic() {
        assertEquals( new Result ("Pause").toString(), nlp.coupleActionObjetDepuisPhrase("Met sur pause").toString());
    }

    @org.junit.Test
    public void resumeMusic() {
        assertEquals( new Result ("Resume").toString(), nlp.coupleActionObjetDepuisPhrase("Reprend la lecture").toString());
    }

    @org.junit.Test
    public void volume() {
        assertEquals( new Result ("VolUp").toString(), nlp.coupleActionObjetDepuisPhrase("Baisse le son").toString());
        assertEquals( new Result ("VolDown").toString(), nlp.coupleActionObjetDepuisPhrase("Monte le son").toString());
    }

    @org.junit.Test
    public void like() {
        Result like = new Result ("Like");
        Result dislike = new Result ("Dislike");

        assertEquals( like.toString(), nlp.coupleActionObjetDepuisPhrase("J'aime ce morceau").toString());
        assertEquals( dislike.toString(), nlp.coupleActionObjetDepuisPhrase("Je n'aime pas ce morceau").toString());
        assertEquals( like.toString(), nlp.coupleActionObjetDepuisPhrase("J'aime").toString());
        assertEquals( dislike.toString(), nlp.coupleActionObjetDepuisPhrase("Je n'aime pas").toString());
    }

    @org.junit.Test
    public void skipForward() {
        Result skipForward = new Result ("SkipForw");
        assertEquals( skipForward.toString(), nlp.coupleActionObjetDepuisPhrase("Passe ce morceau").toString());
        assertEquals( skipForward.toString(), nlp.coupleActionObjetDepuisPhrase("Suivant").toString());
    }

    @org.junit.Test
    public void skipBackward() {
        Result skipBack = new Result ("SkipBack");
        assertEquals( skipBack.toString(), nlp.coupleActionObjetDepuisPhrase("Revient en arrière").toString());
        assertEquals( skipBack.toString(), nlp.coupleActionObjetDepuisPhrase("Precedent").toString());
    }

    @org.junit.Test
    public void shuffle() {
        assertEquals( new Result ("Shuffle").toString(), nlp.coupleActionObjetDepuisPhrase("Met en boucle").toString());
    }

    @org.junit.Test
    public void stopMusic() {
        Result stop = new Result ("Stop");
        assertEquals( stop.toString(), nlp.coupleActionObjetDepuisPhrase("Stop").toString());
        assertEquals( stop.toString(), nlp.coupleActionObjetDepuisPhrase("Arrête la musique").toString());
        assertEquals( stop.toString(), nlp.coupleActionObjetDepuisPhrase("Stop la musique").toString());
    }
}