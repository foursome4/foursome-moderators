import "./groups.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";

function Groups() {

    


    return (
        <div className="content">
        <div className="groups">
            <Navbar />
            <h1>Grupos</h1>

            <div className="groups-list">

            </div>
        </div>
        </div>
    )
}

export {Groups}