package tl;

import com.zeroc.Ice.Current;

import java.io.File;

public class Player implements PlayerCommands {

    private final StreamHttp streamHttp;
    private final ClientFtp clientFtp;

    public Player(StreamHttp streamHttp) {
        this.streamHttp = streamHttp;
        clientFtp = new ClientFtp("127.0.0.1", 21, "anonymous", "@anonymous");
    }

    private String getUri(String song) {
        return App.FOLDER + song;
    }

    @Override
    public boolean play(boolean b, Current current) {
        System.out.println(b ? "Playing" : "Pausing");
        if (b) {
            streamHttp.controlPlay();
        } else {
            streamHttp.controlPause();
        }
        return true;
    }

    @Override
    public boolean playSong(String song, Current current) {
        streamHttp.mediaPlayer.media().play(getUri(song));
        return true;
    }

    @Override
    public boolean stop(Current current) {
        System.out.println("Stopping");
        streamHttp.controlStop();
        return true;
    }

    @Override
    public boolean repeat(boolean b, Current current) {
        System.out.println(b ? "RepeatingOn" : "RepeatingOff");
        streamHttp.controlRepeat(b);
        return true;
    }

    @Override
    public boolean volume(int b, Current current) {
        System.out.println("Volume at " + b);
        streamHttp.controlVolume(b);
        return true;
    }

    @Override
    public void downloadFile(String song, Current current) {
        System.out.println("Downloading " + song);
        clientFtp.connect();
        clientFtp.downloadFile(song);
        clientFtp.disconnect();
    }

    @Override
    public void removeFile(String song, Current current) {
        System.out.println(App.FOLDER + song);
        File file = new File(App.FOLDER + song);

        if (file.delete()) {
            System.out.println("File deleted successfully");
        }
        else {
            System.out.println("Failed to delete the file");
        }
    }
}
