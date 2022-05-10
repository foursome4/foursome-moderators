import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import { AccountCreatedInvite } from "../AccountCreatedInvite/AccountCreatedInvite"
import "./invites.css"

function Invites() {
    const {deleteInvite} = useContext(AuthContext);

    
    const [search, setSearch] = useState('');

    const {data} = useFetch(`/invites`);
    console.log(data)
    
    

    function handleDeleteInvite(id) {
        const deletar = window.confirm("Deseja deletar o convite?");
        if(deletar === true) {
            deleteInvite(id);
        } 
        
    }

    let SearchUsers = []
    const searchLower = search.toLowerCase()

    if(data) {
        SearchUsers = data?.filter((informations) => informations.email.toLowerCase().includes(searchLower))
    }


    return (

        <div className="invitesList">
                <h5>Total de convites: {SearchUsers.length}</h5>
                          <div className="search">
                          <input type="text" placeholder='Buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
                        </div>

<div className="invitListAll">
                {SearchUsers?.map((invite) => {
                   return (
                    <div className="invitesUnic">
                    <div className="codes">
                    <h5> <b>Enviado por:</b>  {invite.username}</h5>
                    <h5>-</h5>
                    <h5><b>ID:</b>  {invite.idAccount}</h5>
                    </div>
                    <h5><b>E-mail:</b>  {invite.email}</h5>
                    <h5><b>Tipo de conta:</b>  {invite.type}</h5>
                    <AccountCreatedInvite mail={invite.email} />
                    <div className="buttons">
                        <button onClick={() => {handleDeleteInvite(invite.id)}}>Deletar convite</button>
                    </div>
                </div>
                   )
                })}
</div>

        </div>
    )
}


function InvitesCounter() {
    
    const {data} = useFetch(`/invites`);

    
    if(!data) {
        return (
            <>Carregando...</>
        )
    }


    return (

        <>
          <h4>{data?.length}</h4>
        </>
    )
}

export {Invites, InvitesCounter}