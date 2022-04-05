import React from 'react';
import logo from "../Ressources/icons/realm-seeklogo.svg";
import filter from "../Ressources/icons/filter_alt_white_24dp.svg";
import sync from "../Ressources/icons/sync_white_24dp.svg";

function Menu(props) {

    const handleSyncAction = () => {
        props.selectAllFromDb()
    }

    return (
        <div className={"flex h-[75px] mt-2"}>
            <img draggable={false} src={logo} alt="logo" width={"45"} className={"mx-4 hover:cursor-pointer"} onClick={() => props.setView("musicList")}/>
            <div className={"flex flex-row h-[45px] w-full my-auto mr-4 rounded-3xl border-neutral-600 px-2 border-2 bg-neutral-800"}>
                <svg height={30} width={40} className={"my-auto mx-1"}>
                    <circle cx="15" cy="15" r="10" fill={"white"}/>
                    <circle cx="15" cy="15" r="8" fill={"rgb(38,38,38)"}/>
                </svg>
                <input className={"bg-transparent text-white w-full my-auto select-text"} type={"text"} placeholder={"Search..."}/>
                <div className={"my-auto bg-neutral-700 border border-neutral-600 text-white py-0.5 px-2 rounded-xl m-1 hover:cursor-pointer select-text"}>Filtre</div>
                <div className={"my-auto bg-neutral-700 border border-neutral-600 text-white py-0.5 px-2 rounded-xl m-1 hover:cursor-pointer select-text"}>Filtre</div>
                <div className={"border-r border-dotted h-[30px] my-auto mx-2 border-neutral-600"}/>
                <div className={"flex flex-row px-2 h-full hover:cursor-pointer mr-4"}>
                    <img draggable={false} src={filter} alt={"filterIcon"} width={22}/>
                    <p className={"text-white my-auto px-1 "}>Filtres</p>
                </div>
            </div>
            {
                props.view === "addMusic" ? "" :   <div className={"flex text-white w-[230px] h-[45px] m-auto rounded-full bg-neutral-800 border-neutral-600 border-2 mr-4 hover:cursor-pointer hover:border-[#1DB954]"}
                                             onClick={() => props.setView("addMusic")}>
                                            <p className={"m-auto"}>Ajouter une musique</p>
                                        </div>
            }
            <img src={sync} width={40} className={"mr-4 hover:cursor-pointer"} alt={"Sync button"} draggable={false} onClick={() => handleSyncAction()}/>
        </div>
    );
}

export default Menu;
