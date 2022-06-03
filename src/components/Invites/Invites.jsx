import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import { AccountCreatedInvite } from "../AccountCreatedInvite/AccountCreatedInvite"
import "./invites.css"

function Invites() {
    const {deleteInvite} = useContext(AuthContext);

    const [informationsInvites, setInformationsInvites] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState("All")

    const {data} = useFetch(`/invites`);
 

    useEffect(() => {
        async function loadAccountsInvites() {
            const res = await api.get(`/invites`);

            res.data.forEach(async (dado) => {
                console.log(dado.email)
                console.log(dado.email)
            const res = await api.get(`/accounts/find/${dado.email}`);

            const infos = {
                id: dado.id,
                username: dado.username,
                idAccount: dado.idAccount,
                type: dado.type,
                email: dado.email,
                createAccount: res.data[0] === null || res.data[0] === undefined || res.data[0] === ""? false : true 
            }

            setInformationsInvites(oldInvites => [...oldInvites, infos])
            })
        }

        loadAccountsInvites()
    },[])
    
console.log(informationsInvites)
    

    function handleDeleteInvite(id) {
        const deletar = window.confirm("Deseja deletar o convite?");
        if(deletar === true) {
            deleteInvite(id);
        } 
        
    }

    function handleSelectFilter(e) {
        e.preventDefault();
        setFilter("All")
    }
    function handleSelectFilterYes(e) {
        e.preventDefault();
        setFilter("Yes")
    }
    function handleSelectFilterNot(e) {
        e.preventDefault();
        setFilter("Not")
    }

    let SearchUsers = []
    const searchLower = search.toLowerCase()
    
    const invitesAccountsCreate = informationsInvites.filter((informations) => informations.createAccount === true );
    const invitesAccountsCreate2 = invitesAccountsCreate.filter((informations) => informations.email.toLowerCase().includes(searchLower));
    const invitesAccountsNotCreate = informationsInvites.filter((informations) => informations.createAccount === false );
    const invitesAccountsNotCreate2 = invitesAccountsNotCreate.filter((informations) => informations.email.toLowerCase().includes(searchLower) );
    if(data) {
        SearchUsers = data?.filter((informations) => informations.email.toLowerCase().includes(searchLower))
    }


    const filterInvites = filter === "All" ? SearchUsers : filter === "Yes" ? invitesAccountsCreate2 : filter === "Not" ? invitesAccountsNotCreate2 : ""

    return (

        <div className="invitesList">
                <h5>{filter === "All" ? "Total de convites:" : filter === "Yes" ? "Total de convites com conta criada:" : filter === "Not" ? "Total de convites sem conta criada:": ""} {filter === "All" ? SearchUsers.length : filter === "Yes" ? invitesAccountsCreate.length : filter === "Not" ? invitesAccountsNotCreate.length : ""}</h5>
                <div className="buttons">
                <button onClick={handleSelectFilter}>Todos</button>
                <button onClick={handleSelectFilterYes}>Com conta</button>
                <button onClick={handleSelectFilterNot}>Sem conta</button>
                </div>
                          <div className="search">
                          <input type="text" placeholder='Buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
                        </div>

<div className="invitListAll">
                {filterInvites?.map((invite) => {
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