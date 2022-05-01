package tl;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

import java.util.Objects;

public class StreamHttp implements Runnable {

    private final String options;
    MediaPlayer mediaPlayer;

    public StreamHttp(String serverAddress, int serverPort) {
        this.options = formatHttpStream(serverAddress, serverPort); //formatHttpStream("localhost", 5555)
    }

    private String formatHttpStream(String serverAddress, int serverPort) {
        return ":sout=#duplicate{dst=std{access=http,mux=mp3," +
                "dst=" +
                serverAddress +
                ':' +
                serverPort +
                "}}";
    }

    @Override
    public void run() {
        startPlayer();
        try {
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt();
        }
    }

    public void startPlayer() {
        MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
        mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        mediaPlayer.media().play(Objects.requireNonNull(getClass().getClassLoader().getResource("2-seconds-of-silence.mp3")).getPath(), options);
    }

    public void controlPlay() {
        if(mediaPlayer == null) startPlayer();
        mediaPlayer.controls().play();
    }

    public void controlPause() {
        mediaPlayer.controls().pause();
    }

    public void controlStop() {
        mediaPlayer.controls().stop();
        mediaPlayer.release();
    }

    public void controlRepeat(boolean repeat) {
        mediaPlayer.controls().setRepeat(repeat);
    }

    public void controlVolume(int volume) {
        mediaPlayer.audio().setVolume(volume);
    }
}