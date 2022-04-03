import React from 'react';

function SongInfos(props) {
    const [title, setTitle] = React.useState(props.song.title);
    const [artist, setArtist] = React.useState(props.song.artist);
    const [album, setAlbum] = React.useState(props.song.album);
    const [cover, setCover] = React.useState(props.song.cover);
    const [fileURI, setFileURI] = React.useState(props.song.fileURI);

    const cleanUpFileName = (fileName) => {
        let tmp = fileName.split("\\");
        return tmp[tmp.length - 1];
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
                <div className={"flex w-full mt-4"}>
                    <label htmlFor={"fileMusic"} className={"my-auto w-[180px] hover:cursor-pointer hover:text-[#1DB954]"}>Choisir un fichier MP3: </label>
                    <input id={"fileMusic"} type={"file"} className={"hidden"}  accept={".mp3"} onChange={(event) => setFileURI(event.target.value)}/>
                    <div className={"w-[354px] h-[40px] border-2 border-neutral-600 rounded-lg px-3 my-auto bg-neutral-800 flex"}>
                        <p className={"my-auto overflow-hidden whitespace-nowrap overflow-ellipsis"}>{cleanUpFileName(fileURI)}</p>
                    </div>
                </div>
                <input type={"submit"} value={"Modifier la musique"} className={"mt-8 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 hover:border-[#1DB954] w-[50%] m-auto"}/>
            </div>
        </div>
    );
}

export default SongInfos;
