import "./accounts.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";

function Accounts() {

    


    return (
        <div className="content">
        <div className="accounts">
            <Navbar />
            <h1>Contas de Usuário</h1>

            <div className="accounts-list">

            </div>
        </div>
        </div>
    )
}

export {Accounts}