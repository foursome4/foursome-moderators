import "./foruns.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";

function Foruns() {

    


    return (
        <div className="content">
        <div className="foruns">
            <Navbar />
            <h1>Foruns</h1>

            <div className="foruns-list">

            </div>
        </div>
        </div>
    )
}

export {Foruns}