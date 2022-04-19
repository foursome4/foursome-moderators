import { Invites } from "../../components/Invites/Invites";
import { TopBar } from "../../components/TopBar/TopBar";
import "./invite.css"

function Invite() {
    return (
            <div className="invite">
                <TopBar />
                <h1>Lista de convites enviados</h1>
                <Invites />
            </div>
    )
}

export {Invite}