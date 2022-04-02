import React from 'react';
import clock from "../Ressources/icons/schedule_white_24dp.svg"
import favorite from "../Ressources/icons/favorite_green_24dp.svg"

const musiques = {
    "1": {
        "id": "1",
        "title": "Sweet Dreams (Are Made Of This)",
        "artist": "Marylin Manson",
        "album": "Smell Like Children",
        "duration": "4:53",
        "cover": "https://picsum.photos/45",
        "favorite": false,
    },
    "2": {
        "id": "2",
        "title": "Music Sounds Better With You",
        "artist": "Stardust",
        "album": "Music Sounds Better With You",
        "duration": "6:43",
        "cover": "https://picsum.photos/45",
        "favorite": true,
    },
    "3": {
        "id": "3",
        "title": "Sweet Dreams (Are Made Of This)",
        "artist": "Marylin Manson",
        "album": "Smell Like Children",
        "duration": "4:53",
        "cover": "https://picsum.photos/45",
        "favorite": false,
    },
    "4": {
        "id": "4",
        "title": "Music Sounds Better With You",
        "artist": "Stardust",
        "album": "Music Sounds Better With You",
        "duration": "6:43",
        "cover": "https://picsum.photos/45",
        "favorite": true,
    },
    "5": {
        "id": "5",
        "title": "Sweet Dreams (Are Made Of This)",
        "artist": "Marylin Manson",
        "album": "Smell Like Children",
        "duration": "4:53",
        "cover": "https://picsum.photos/45",
        "favorite": false,
    },
    "6": {
        "id": "6",
        "title": "Music Sounds Better With You",
        "artist": "Stardust",
        "album": "Music Sounds Better With You",
        "duration": "6:43",
        "cover": "https://picsum.photos/45",
        "favorite": true,
    },
    "7": {
        "id": "7",
        "title": "Sweet Dreams (Are Made Of This)",
        "artist": "Marylin Manson",
        "album": "Smell Like Children",
        "duration": "4:53",
        "cover": "https://picsum.photos/45",
        "favorite": false,
    },
    "8": {
        "id": "8",
        "title": "Music Sounds Better With You",
        "artist": "Stardust",
        "album": "Music Sounds Better With You",
        "duration": "6:43",
        "cover": "https://picsum.photos/45",
        "favorite": true,
    },
    "9": {
        "id": "9",
        "title": "Sweet Dreams (Are Made Of This)",
        "artist": "Marylin Manson",
        "album": "Smell Like Children",
        "duration": "4:53",
        "cover": "https://picsum.photos/45",
        "favorite": false,
    },
    "10": {
        "id": "10",
        "title": "Music Sounds Better With You",
        "artist": "Stardust",
        "album": "Music Sounds Better With You",
        "duration": "6:43",
        "cover": "https://picsum.photos/45",
        "favorite": true,
    }

}
function MusicList() {

    return (
        <div className={"h-full m-4"}>
            <div className={"flex flex-col text-gray-400"}>
                <div className={"flex font-bold"}>
                    <div className={"text-center w-[15px] ml-2"}>#</div>
                    <div className={"text-left w-[570px] ml-3"}>TITRE</div>
                    <div className={"text-left w-[435px]"}>ALBUM</div>
                    <div className={"w-[20px]"}/>
                    <div className={"w-[100px]"}>
                        <img src={clock} className={"h-[20px] m-auto"} alt={"clock icon"}/>
                    </div>
                </div>
                <div className={"border-b rounded-b-full border-b-neutral-800 my-2"}/>
                <div id={"musicList"} className={"overflow-y-scroll h-[460px]"}>
                {
                    Object.keys(musiques).map((key) => {
                        return (
                            <div className={"flex mt-2 text-sm hover:cursor-pointer"}>
                                <div className={"my-auto w-[15px] text-center ml-2"}>{musiques[key].id}</div>
                                <div className={"flex w-[570px] ml-3"}>
                                    <img src={musiques[key].cover} className={"h-[45px]"} alt={"cover album"}/>
                                    <div className={"flex flex-col ml-3"}>
                                        <p className={"text-white my-auto text-base"}>{musiques[key].title}</p>
                                        <p className={"my-auto"}>{musiques[key].artist}</p>
                                    </div>
                                </div>
                                <div className={"w-[435px] my-auto"}>{musiques[key].album}</div>
                                {
                                    musiques[key].favorite ?
                                        <div className={"w-[20px] my-auto"}>
                                            <img src={favorite} className={"h-[20px] m-auto"} alt={"favorite icon"}/>
                                        </div>
                                        :
                                        <div className={"w-[20px] my-auto"}/>
                                }
                                <div className={"w-[100px] text-center my-auto"}>{musiques[key].duration}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>

    );
}

export default MusicList;
