import React from 'react';

function AddMusic(props) {
    const [fileName, setFileName] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [artist, setArtist] = React.useState("")
    const [album, setAlbum] = React.useState("")
    const [duration, setDuration] = React.useState("10:00")
    const [cover, setCover] = React.useState("https://picsum.photos/200")
    const [serverId, setServerId] = React.useState(0)

    const cleanUpFileName = (name) => {
        let tmp = name.split("\\")
        return tmp[tmp.length - 1]
    }

    const handleAction = () => {
        if(album === "") return alert("Album name is not valid")
        if(artist === "") return alert("Artist name is not valid")
        if(!/([0-9]*):([0-9]*)/.test(duration)) return alert("Duration is not valid")
        if("") return alert("Title is not valid")
        props.addToDb(album, artist, duration, cover, title, fileName, serverId)

        window["electronAPI"].playerCommand({cmd: "sendFile", name: fileName, serverId: serverId})

        if(props.error)
            return alert(props.error)
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
                       value={cover}
                       onChange={(ev) => setCover(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"}
                       placeholder={"Durée"}
                       value={duration}
                       onChange={(ev) => setDuration(ev.target.value)}
                       className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <div className={"flex w-full mt-4"}>
                    <label htmlFor={"fileMusic"} className={"my-auto w-[180px] hover:cursor-pointer hover:text-[#1DB954]"}>Choisir un fichier MP3: </label>
                    <input id={"fileMusic"} type={"file"} className={"hidden"}  accept={".mp3"} onChange={(event) => {
                        setFileName(cleanUpFileName(event.target.value))
                    }} />
                    <div className={"w-[354px] h-[40px] border-2 border-neutral-600 rounded-lg px-3 my-auto bg-neutral-800 flex"}>
                        <p className={"my-auto overflow-hidden whitespace-nowrap overflow-ellipsis"}>{fileName}</p>
                    </div>
                </div>
                <div className={"flex m-auto mt-4"}>
                    <label className={"mx-2"}><input type={"checkbox"} className={"w-[20px] h-[20px] mr-1"} checked={serverId === 0} onClick={() => {setServerId(0)
                    console.log(serverId)}}/>Serveur 1</label>
                    <label className={"mx-2"}><input type={"checkbox"} className={"w-[20px] h-[20px] mr-1"} checked={serverId === 1} onClick={() => {
                        setServerId(1)
                        console.log(serverId)
                    }}/>Serveur 2</label>
                </div>
                <input type={"submit"}
                       value={"Ajouter la musique"}
                       className={"mt-8 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 hover:border-[#1DB954] w-[50%] m-auto"}
                       onClick={() => handleAction()}/>
            </div>
        </div>
    )
}

export default AddMusic;
