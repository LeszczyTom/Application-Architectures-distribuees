import React, {useRef} from 'react';
import backward from "../Ressources/first_page_white_24dp.svg"
import forward from "../Ressources/last_page_white_24dp.svg"
import jsmpeg from "jsmpeg"

function Player() {

    let client = new WebSocket('ws://localhost:8084');
    new jsmpeg(client, {});

    return (
        <>
            <div className="jsmpeg" data-url={client} data-loop="true" data-autoplay="true"/>
            <div className={"flex bg-neutral-800 w-full h-[90px] mb-0 rounded-t-2xl"}>
                <img src={"https://picsum.photos/50"} className={"h-[50px] my-auto ml-5 rounded-xl"}/>
                <div className={"flex flex-col text-white my-auto ml-2 text-sm"}>
                    <p>Titre</p>
                    <p className={"text-gray-400"}>Artiste</p>
                </div>
                <img src={backward}/>
                <img src={forward}/>
            </div>
        </>
    );
}

export default Player;
