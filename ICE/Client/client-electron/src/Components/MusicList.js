import React from 'react';
import clock from "../Ressources/icons/schedule_white_24dp.svg"
import favorite from "../Ressources/icons/favorite_green_24dp.svg"
import moreHoriz from "../Ressources/icons/more_horiz_white_24dp.svg"
import play from "../Ressources/icons/play_arrow_white_24dp.svg"

function MusicList(props) {

    const [hover, setHover] = React.useState("-1");

    const handleOnClick = (musique) => {
        props.setSong({
            id: musique.id.S,
            title: musique.SongTitle.S,
            artist: musique.Artist.S,
            album: musique.Album.S,
            cover: musique.Cover.S,
            fileURI: musique.Cover.S,
        })
        props.setView("songInfos")
    }

    const handlePlayButton = (musique) => {
        props.setPlay({
            title: musique.SongTitle.S,
            artist: musique.Artist.S,
            cover: musique.Cover.S,
            favorite: musique.Favorite.S === "True",
        })
    }

    return (
        <div className={"h-full m-4"}>
            <div className={"flex flex-col text-gray-400"}>
                <div className={"flex font-bold"}>
                    <div className={"text-center w-[15px] ml-2"}>#</div>
                    <div className={"text-left w-[570px] ml-3"} onClick={() => test()}>TITRE</div>
                    <div className={"text-left w-[435px]"}>ALBUM</div>
                    <div className={"w-[20px]"}/>
                    <div className={"w-[100px]"}>
                        <img draggable={false} src={clock} className={"h-[20px] m-auto"} alt={"clock icon"}/>
                    </div>
                </div>
                <div className={"border-b rounded-b-full border-b-neutral-800 my-2"}/>
                <div id={"musicList"} className={"overflow-y-scroll h-[468px]"}>
                {
                    props.musiques !== null ?
                    Object.keys(props.musiques.Items).map((key) => {
                        return (
                            <div className={"flex mt-2 py-1 rounded-lg text-sm hover:bg-neutral-800"}
                                 onMouseEnter={() => setHover(key)}
                                 onMouseLeave={() => setHover("-1")}>
                                {
                                    hover === key ?
                                        <div className={"w-[23px] flex hover:cursor-pointer"} onClick={() => handlePlayButton(props.musiques.Items[key])}>
                                            <img draggable={false} src={play} className={"h-[30px] ml-2 my-auto"} alt={"play icon"}/>
                                        </div>
                                        :
                                        <div className={"my-auto w-[15px] text-center ml-2"}>{parseInt(key) + 1}</div>
                                }
                                <div className={"flex w-[570px] ml-3"}>
                                    <img draggable={false} src={props.musiques.Items[key].Cover.S} className={"h-[45px]"} alt={"cover album"}/>
                                    <div className={"flex flex-col ml-3"}>
                                        <p className={"text-white my-auto text-base"}>{props.musiques.Items[key].SongTitle.S}</p>
                                        <p className={"my-auto"}>{props.musiques.Items[key].Artist.S}</p>
                                    </div>
                                </div>
                                <div className={"w-[435px] my-auto"}>{props.musiques.Items[key].Album.S}</div>
                                {
                                    props.musiques.Items[key].Favorite.S === "True" ?
                                        <div className={"w-[20px] my-auto"}>
                                            <img draggable={false} src={favorite} className={"h-[20px] m-auto"} alt={"favorite icon"}/>
                                        </div>
                                        :
                                        <div className={"w-[20px] my-auto"}/>
                                }
                                <div className={"w-[60px] text-right my-auto"}>{props.musiques.Items[key].Duration.S}</div>
                                <div className={"w-[38px] flex"}>
                                    <img className={"w-[20px] m-auto hover:cursor-pointer"}
                                         draggable={false} src={moreHoriz}
                                         onClick={() => handleOnClick(props.musiques.Items[key])} alt={"option"}/>
                                </div>
                            </div>
                        )
                    }) : <div className={"w-full"}>
                            <p className={"w-fit m-auto my-8 text-xl"}>La liste est vide ...</p>
                        </div>
                }
                <div className={"m-auto my-4 w-fit bg-neutral-800 rounded-full py-3 px-9 text-white hover:cursor-pointer"}
                onClick={() => props.setView("addMusic")}>
                    Ajouter une musique
                </div>
                </div>
            </div>
        </div>

    );
}

export default MusicList;
