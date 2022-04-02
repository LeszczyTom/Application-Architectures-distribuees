package tl.vlc;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

public class StreamHttp {

    public static void main(String[] args) throws Exception {
        if(args.length != 1) {
            System.out.println("Specify a single MRL to stream");
            System.exit(1);
        }

        String media = args[0];
        String options = formatHttpStream("localhost", 5555);

        System.out.println("Streaming '" + media + "' to '" + options + "'");

        MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory(args);
        MediaPlayer mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        mediaPlayer.media().play(media, options);

        // Don't exit
        Thread.currentThread().join();
    }

    private static String formatHttpStream(String serverAddress, int serverPort) {
        StringBuilder sb = new StringBuilder(60);
        sb.append(":sout=#duplicate{dst=std{access=http,mux=mp3,");
        sb.append("dst=");
        sb.append(serverAddress);
        sb.append(':');
        sb.append(serverPort);
        sb.append("}}");
        return sb.toString();
    }
}