module tl
{
    interface PlayerCommands {
        bool play(bool b);
        bool stop();
        bool next();
        bool previous();
        bool shuffle(bool b);
        bool repeat(bool b);
        bool volume(int b);
    };
};
