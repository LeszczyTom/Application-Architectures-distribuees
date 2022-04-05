import React from 'react';
import deleteIcon from '../Ressources/icons/delete_red_24dp.svg';
import favoriteEmpty from '../Ressources/icons/favorite_border_white_24dp.svg';
import favoriteGreen from '../Ressources/icons/favorite_green_24dp.svg';

function SongInfos(props) {
    const [title, setTitle] = React.useState(props.song.title);
    const [artist, setArtist] = React.useState(props.song.artist);
    const [album, setAlbum] = React.useState(props.song.album);
    const [cover, setCover] = React.useState(props.song.cover);
    const [duree, setDuree] = React.useState(props.song.duration);
    const [favorite, setFavorite] = React.useState(props.song.favorite);
    const [fileURI, setFileURI] = React.useState(props.song.fileURI);

    const cleanUpFileName = (fileName) => {
        let tmp = fileName.split("\\");
        return tmp[tmp.length - 1];
    }

    const handleDeleteAction = () => {
        props.deleteSong(props.song.id);
        if(props.error) return alert("Error while deleting song");
        props.setView("musicList");
    }

    const handleUpdateAction = () => {
        props.updateSong(props.song.id, album, artist, duree, cover, title, favorite);
        if(props.error) return alert("Error while updating song");
        props.setView("musicList");
    }

    const handleFavoriteAction = () => {
        favorite === "true" ? setFavorite("false") : setFavorite("true");
    }

    return (
        <div className={"h-full flex m-4 text-white select-text"}>
            <div className={"flex flex-col mx-[300px] p-4 my-auto text-white"}>
                <div className={"flex mt-4 "}>
                    <img src={cover} width={96} height={96} alt={"Album cover"} draggable={false} className={"w-[96px] border bg-neutral-800 border-neutral-600 rounded-xl"}/>
                    <div className={"flex flex-col ml-4 w-[422px]"}>
                        <input type={"text"}
                               placeholder={"Titre"}
                               value={title}
                               onChange={(event) => setTitle(event.target.value)}
                               className={"h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                        <input type={"text"}
                               placeholder={"Artiste"}
                               value={artist}
                               onChange={(event) => setArtist(event.target.value)}
                               className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                    </div>
                </div>
                <input type={"text"}
                       placeholder={"Album"}
                       value={album}
                       onChange={(event) => setAlbum(event.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Lien de la pochette de l'album"}
                       value={cover}
                       onChange={(event) => setCover(event.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Durée"}
                       value={duree}
                       onChange={(event) => setDuree(event.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <div className={"flex w-full mt-4"}>
                    <label htmlFor={"fileMusic"} className={"my-auto w-[180px] hover:cursor-pointer hover:text-[#1DB954]"}>Choisir un fichier MP3: </label>
                    <input id={"fileMusic"} type={"file"} className={"hidden"}  accept={".mp3"} onChange={(event) => setFileURI(event.target.value)}/>
                    <div className={"w-[354px] h-[40px] border-2 border-neutral-600 rounded-lg px-3 my-auto bg-neutral-800 flex"}>
                        <p className={"my-auto overflow-hidden whitespace-nowrap overflow-ellipsis"}>{cleanUpFileName(fileURI)}</p>
                    </div>
                </div>
                <div className={"flex m-auto mt-8"}>
                    <img src={favorite === "false" ? favoriteEmpty : favoriteGreen} alt={"like btn"} width={40} className={"hover:cursor-pointer"} onClick={() => handleFavoriteAction()}/>
                    <input type={"submit"} value={"Modifier la musique"} className={"h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 hover:border-[#1DB954] w-[230px] ml-8"} onClick={() => handleUpdateAction()}/>
                    <img src={deleteIcon} alt={"delete icon"} width={40} className={"ml-8 hover:cursor-pointer"} onClick={() => handleDeleteAction()}/>
                </div>
            </div>
        </div>
    );
}

export default SongInfos;
