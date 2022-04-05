import React from 'react';

function AddMusic(props) {
    const [file, setFile] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [artist, setArtist] = React.useState("");
    const [album, setAlbum] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [cover, setCover] = React.useState("");

    const cleanUpFileName = (fileName) => {
        let tmp = fileName.split("\\");
        return tmp[tmp.length - 1];
    }

    const handleAction = () => {
        if(!/^[a-z ,.'-]+$/i.test(album)) return alert("Album name is not valid");
        if(!/^[a-z ,.'-]+$/i.test(artist)) return alert("Artist name is not valid");
        if(!/([0-9]*):([0-9]*)/.test(duration)) return alert("Duration is not valid");
        if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/.test(cover)) return alert("Cover is not valid");
        if(!/^[a-z ,.'-()]+$/i.test(title)) return alert("Title is not valid");
        props.addToDb(album, artist, duration, cover, title);
        if(props.error)
            return alert(props.error);
        props.setView("musicList")
    }

    return (
        <div className={"h-full m-4 flex"}>
            <div className={"flex flex-col mx-[300px] p-4 my-auto text-white"}>
                <input type={"text"}
                       placeholder={"Titre"}
                       onChange={(ev) => setTitle(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Artiste"}
                       onChange={(ev) => setArtist(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Album"}
                       onChange={(ev) => setAlbum(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Lien de la pochette de l'album"}
                       onChange={(ev) => setCover(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Durée"}
                       onChange={(ev) => setDuration(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <div className={"flex w-full mt-4"}>
                    <label htmlFor={"fileMusic"} className={"my-auto w-[180px] hover:cursor-pointer hover:text-[#1DB954]"}>Choisir un fichier MP3: </label>
                    <input id={"fileMusic"} type={"file"} className={"hidden"}  accept={".mp3"} onChange={(event) => setFile(event.target.value)} />
                    <div className={"w-[354px] h-[40px] border-2 border-neutral-600 rounded-lg px-3 my-auto bg-neutral-800 flex"}>
                        <p className={"my-auto overflow-hidden whitespace-nowrap overflow-ellipsis"}>{cleanUpFileName(file)}</p>
                    </div>
                </div>
                <input type={"submit"}
                       value={"Ajouter la musique"}
                       className={"mt-8 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 hover:border-[#1DB954] w-[50%] m-auto"}
                       onClick={() => handleAction()}/>
            </div>
        </div>
    );
}

export default AddMusic;
