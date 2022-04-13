module tl
{
    sequence<byte> file;

    interface PlayerCommands {
        bool play(bool b);
        bool playSong(string song);
        bool stop();
        bool repeat(bool b);
        bool volume(int b);
        void send(file f);
        void receive(file f);
    };

};
