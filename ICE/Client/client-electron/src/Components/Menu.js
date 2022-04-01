import React from 'react';
import logo from "../Ressources/realm-seeklogo.svg";
import filter from "../Ressources/filter_alt_white_24dp.svg";

function Menu() {
    return (
        <div className={"flex flex-row h-[75px]"}>
            <img src={logo} alt="logo" width={"45"} className={"mx-4"}/>
            <div className={"flex flex-row h-[45px] w-full my-auto mr-4 rounded-3xl border-neutral-600 px-2 border-2 bg-neutral-800"}>
                <svg height={30} width={40} className={"my-auto mx-1"}>
                    <circle cx="15" cy="15" r="10" fill={"white"}/>
                    <circle cx="15" cy="15" r="8" fill={"rgb(38,38,38)"}/>
                </svg>
                <input className={"bg-transparent text-white w-full my-auto"} type={"text"} placeholder={"Search..."}/>
                <div className={"my-auto bg-neutral-700 border border-neutral-600 text-white py-0.5 px-2 rounded-xl m-1 hover:cursor-pointer"}>Filtre</div>
                <div className={"my-auto bg-neutral-700 border border-neutral-600 text-white py-0.5 px-2 rounded-xl m-1 hover:cursor-pointer"}>Filtre</div>
                <div className={"border-r border-dotted h-[30px] my-auto mx-2 border-neutral-600"}/>
                <div className={"flex flex-row px-2 h-full hover:cursor-pointer mr-4"}>
                    <img src={filter} alt={"filterIcon"} width={22}/>
                    <p className={"text-white my-auto px-1 "}>Filtres</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;
