import "./events.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";

function Events() {

    


    return (
        <div className="content">
        <div className="events">
            <Navbar />
            <h1>Eventos</h1>

            <div className="events-list">

            </div>
        </div>
        </div>
    )
}

export {Events}