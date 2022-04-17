package tl;

import org.apache.commons.net.ftp.FTPClient;

public class ClientFtp {

    private FTPClient ftpClient;
    private String host;
    private String user;
    private String pass;
    private int port;

    private final String FOLDER = "/home/tom/IdeaProjects/Application-Architectures-distribuees/ICE/Server/app/src/main/resources/";

    public ClientFtp(String host, int port, String user, String pass) {
        try {
            ftpClient = new FTPClient();
            this.host = host;
            this.user = user;
            this.pass = pass;
            this.port = port;
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void connect() {
        try {
            ftpClient.connect(host, port);
            ftpClient.login(user, pass);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void disconnect() {
        try {
            ftpClient.disconnect();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void downloadFile(String remoteFile) {
        try {
            ftpClient.retrieveFile("/" + remoteFile, new java.io.FileOutputStream(FOLDER + remoteFile));
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
