import { Invites } from "../../components/Invites/Invites";
import Navbar from "../../components/Nav/Navbar";
import "./invite.css"

function Invite() {
    return (
            <div className="invite">
                <Navbar />
                <h1>Lista de convites enviados</h1>
                <Invites />
            </div>
    )
}

export {Invite}