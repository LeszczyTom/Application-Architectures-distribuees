package tl;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

public class StreamHttp implements Runnable {

    private final String media;
    private final String options;
    MediaPlayer mediaPlayer;

    public StreamHttp(String media, String serverAddress, int serverPort) {
        this.media = media;
        this.options = formatHttpStream(serverAddress, serverPort); //formatHttpStream("localhost", 5555)
    }

    private String formatHttpStream(String serverAddress, int serverPort) {
        StringBuilder sb = new StringBuilder(60);
        sb.append(":sout=#duplicate{dst=std{access=http,mux=mp3,");
        sb.append("dst=");
        sb.append(serverAddress);
        sb.append(':');
        sb.append(serverPort);
        sb.append("}}");
        return sb.toString();
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
        MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory(media);
        mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        mediaPlayer.media().play(media, options);
        System.out.println("Streaming: " + media);
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