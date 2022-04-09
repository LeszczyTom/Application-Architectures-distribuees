package tl;

import com.zeroc.Ice.Current;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;

public class Player implements PlayerCommands {

    private final StreamHttp streamHttp;
    public Player(StreamHttp streamHttp) {
        this.streamHttp = streamHttp;
        setAvailableSong();
    }

    private ArrayList<String> availableSong;

    private void setAvailableSong() {
        try {
            URL url = new URL("http://localhost:2222/selectAllFromDB");
            //TODO: change request
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
            StringBuffer json = new StringBuffer();
            String line;

            while ((line = reader.readLine()) != null) {
                json.append(line);
            }
            reader.close();
            System.out.println(json.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    } ;

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
    public boolean stop(Current current) {
        System.out.println("Stopping");
        streamHttp.controlStop();
        return true;
    }

    @Override
    public boolean next(Current current) {
        System.out.println("Next");
        return true;
    }

    @Override
    public boolean previous(Current current) {
        System.out.println("Previous");
        return true;
    }

    @Override
    public boolean shuffle(boolean b, Current current) {
        System.out.println(b ? "ShufflingOn" : "ShufflingOff");
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

}
