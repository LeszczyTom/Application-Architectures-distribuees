import React from 'react';

function AddMusic() {
    const [file, setFile] = React.useState("");
    return (
        <div className={"h-full m-4 border"}>
            <div className={"flex flex-col mx-[300px] h-[450px] p-4 mt-6 text-white"}>
                <input type={"text"} placeholder={"Titre"} className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"} placeholder={"Artiste"} className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"} placeholder={"Album"} className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <input type={"text"} placeholder={"Lien de la pochette de l'album"} className={"mt-4 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 focus:border-[#1DB954]"}/>
                <div className={"flex w-full mt-4"}>
                    <label htmlFor={"fileMusic"} className={"my-auto w-[180px] hover:cursor-pointer hover:text-[#1DB954]"}>Choisir un fichier MP3: </label>
                    <input id={"fileMusic"} type={"file"} className={"hidden"}  accept={".mp3"} onChange={(event) => setFile(event.target.value)} />
                    <div className={"w-[354px] h-[40px] border-2 border-neutral-600 rounded-lg px-3 my-auto bg-neutral-800 flex"}>
                        <p className={"my-auto overflow-hidden whitespace-nowrap overflow-ellipsis"}>{file}</p>
                    </div>
                </div>
                <input type={"submit"} value={"Ajouter la musique"} className={"mt-8 h-[40px] bg-neutral-800 rounded-lg border-2 bg-black border border-neutral-600 px-3 hover:border-[#1DB954] w-[50%] m-auto"}/>
            </div>
        </div>
    );
}

export default AddMusic;
