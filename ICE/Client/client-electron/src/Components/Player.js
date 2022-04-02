import React from 'react';
import backward from "../Ressources/first_page_white_24dp.svg"
import forward from "../Ressources/last_page_white_24dp.svg"

function Player() {
    return (
        <>
            <video controls src={"http://127.0.0.1:5555"}/>
            <div className={"flex bg-neutral-800 w-full h-[90px] mb-0 rounded-t-2xl"}>
                <img src={"https://picsum.photos/50"} className={"h-[50px] my-auto ml-5 rounded-xl"} alt={"album musique joué"}/>
                <div className={"flex flex-col text-white my-auto ml-2 text-sm"}>
                    <p>Titre</p>
                    <p className={"text-gray-400"}>Artiste</p>
                </div>
                <img src={backward} alt={"icône precedent"}/>
                <img src={forward} alt={"icône suivant"}/>
            </div>
        </>
    );
}

export default Player;
