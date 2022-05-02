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
        mediaPlayer.media().play("/home/tom/Project/Application-Architectures-distribuees/ICE/Server/app/src/main/resources/2-seconds-of-silence.mp3", options);
    }

    public void playSong(String song) {
        mediaPlayer.media().play(song, options);
    }

    public void controlPlay() {
        if (mediaPlayer == null) startPlayer();
        mediaPlayer.controls().play();
    }

    public void controlPause() {
        if (mediaPlayer == null) startPlayer();
        mediaPlayer.controls().pause();
    }

    public void controlStop() {
        if(mediaPlayer != null) {
            mediaPlayer.controls().pause();
        }
    }

    public void controlRepeat(boolean repeat) {
        mediaPlayer.controls().setRepeat(repeat);
    }

    public void controlVolume(int volume) {
        mediaPlayer.audio().setVolume(volume);
    }
}