import { useEffect, useState } from "react"
import api from "../../services/api"
import "./invites.css"

function Invites() {
    const [invites, setInvites] = useState([])
    useEffect(() => {
        async function loadInvites() {
            await api.get("/invites").then((res) => {
                setInvites(res.data)
            })
        }

        loadInvites()
    })
    return (

        <div className="invitesList">

                {invites.map((invite) => {
                   return (
                    <div className="invitesUnic">
                    <h5>E-mail: {invite.email}</h5>
                    <div className="codes">
                    <h5>Usuário: {invite.username}</h5>
                    <h5>ID: {invite.idAccount}</h5>
                    </div>
                    <h5>Código: {invite.code}</h5>
                    <h5>Tipo de conta: {invite.type}</h5>
                </div>
                   )
                })}
        </div>
    )
}


function InvitesCounter() {
    const [invites, setInvites] = useState([])
    useEffect(() => {
        async function loadInvites() {
            await api.get("/invites").then((res) => {
                setInvites(res.data)
            })
        }

        loadInvites()
    })
    return (

        <>
          <h4>{invites.length}</h4>
        </>
    )
}

export {Invites, InvitesCounter}