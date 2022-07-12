import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import {FiArrowUpCircle} from 'react-icons/fi'
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import { AccountCreatedInvite } from "../AccountCreatedInvite/AccountCreatedInvite"
import "./invites.css"

function Invites() {
    const {deleteInvite, resendMail} = useContext(AuthContext);

    const [informationsInvites, setInformationsInvites] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState("All")
    const [index, setIndex] = useState(0)
    const [qtd, setqtd] = useState(21)

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
                active: dado.active,
                resend: dado.resend,
                code: dado.code,
                name: dado.name,
                phone: dado.phone,
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
        handleResetInvitesView(21);
    }
    function handleSelectFilterYes(e) {
        e.preventDefault();
        setFilter("Yes");
        handleResetInvitesView(21);
    }
    function handleSelectFilterNot(e) {
        e.preventDefault();
        setFilter("Not");
        handleResetInvitesView(21);
    }


    function handleResendEmail(id, email,code, idAccount, username, name, phone, type) {
        resendMail(id, email,code, idAccount, username, name, phone, type)
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

    function deleAllConvites(e) {
        e.preventDefault();
        invitesAccountsNotCreate.forEach((email) => {
            console.log(email.email)
            console.log(email.id)
            deleteInvite(email.id);
        })

        window("/invites", "_self")
    }

    function handleInvitesView(e) {
        e.preventDefault();
        // setIndex(index + 21)
        setqtd(qtd + 21)
    }
    function handleResetInvitesView(newQtd) {
        // setIndex(index + 21)
        setqtd(newQtd)
    }

    function handleTop(e) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const limitData = filterInvites.slice(0, qtd)

    return (
        
        <div className="invitesList">
                <h5>{filter === "All" ? "Total de convites:" : filter === "Yes" ? "Total de convites com conta criada:" : filter === "Not" ? "Total de convites sem conta criada:": ""} {filter === "All" ? SearchUsers.length : filter === "Yes" ? invitesAccountsCreate.length : filter === "Not" ? invitesAccountsNotCreate.length : ""}</h5>
                <div className="buttons">
                <button onClick={handleSelectFilter}>Todos</button>
                <button onClick={handleSelectFilterYes}>Com conta</button>
                <button onClick={handleSelectFilterNot}>Sem conta</button>
                {/* <button onClick={deleAllConvites}>Deletar Todos sem conta</button> */}
                </div>
                          <div className="search">
                          <input type="text" placeholder='Buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
                        </div>

<div className="invitListAll">

                {limitData?.map((invite) => {
                   return (
                    <div className="invitesUnic">
                    <div className="codes">
                    <h5> <b>Enviado por:</b>  {invite.username}</h5>
                    <h5>-</h5>
                    <h5><b>ID:</b>  {invite.idAccount}</h5>
                    </div>
                    <h5><b>E-mail:</b>  {invite.email}</h5>
                    <h5><b>Tipo de conta:</b>  {invite.type}</h5>
                    <h5><b>Convite ativo:</b>  {invite.avtive === true ? "Usado" : "Não usado"}</h5>
                    <h5><b>Convite reenviado:</b>  {invite.resend === true ? "Reenviado" : "Não reenviado"}</h5>
                    <AccountCreatedInvite mail={invite.email} />
                    <div className="buttons">
                        {invite.createAccount === false ?
                        <button
                            className="btn"
                            onClick={() => {handleResendEmail(invite.id, invite.email, invite.code, invite.idAccount, invite.username, invite.name, invite.phone, invite.type)}}
                        >Reenviar</button>
                        : ""}
                        <button onClick={() => {handleDeleteInvite(invite.id)}}>Deletar convite</button>
                    </div>
                </div>
                   )
                })}
                <button onClick={handleInvitesView}>Ver mais</button>
                <button className="top" onClick={handleTop}><FiArrowUpCircle /></button>
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