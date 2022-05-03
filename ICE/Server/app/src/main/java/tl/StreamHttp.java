package tl;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

import java.util.Objects;

public class StreamHttp implements Runnable {

    private final String options;
    MediaPlayer mediaPlayer = null;

    public StreamHttp(String serverAddress, int serverPort) {
        System.out.println("New StreamHttp");
        this.options = formatHttpStream(serverAddress, serverPort); //formatHttpStream("localhost", 5555)
        if(mediaPlayer == null) {
            MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
            mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        }
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
        try {
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt();
        }
    }

    public void playSong(String song) {
        if(mediaPlayer != null) mediaPlayer.release();
        MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
        mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        mediaPlayer.media().play(song, options);
    }

    public void controlPlay() {
        mediaPlayer.controls().play();
    }

    public void controlPause() {
        mediaPlayer.controls().pause();
    }

    public void controlStop() {
        mediaPlayer.controls().pause();
        mediaPlayer.release();

    }

    public void controlRepeat(boolean repeat) {
        mediaPlayer.controls().setRepeat(repeat);
    }

    public void controlVolume(int volume) {
        mediaPlayer.audio().setVolume(volume);
    }
}