import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import { AccountCreatedInvite } from "../AccountCreatedInvite/AccountCreatedInvite"
import "./invites.css"

function Invites() {
    const {deleteInvite} = useContext(AuthContext);

    const [followers, setFollowers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 10;
    const {data} = useFetch(`/invitesqtd?page=${currentPage}&limit=${perPage}`);
    console.log(data)
    
    
    useEffect(() => {
        if(data) {
            setFollowers(oldFollowers => [...oldFollowers, ...data])
        }
  }, [data]);


  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('Sentinela appears!', currentPage + 1)
        setCurrentPage((currentValue) => currentValue + 1);
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinelaInvites'));
    return () => intersectionObserver.disconnect();
  }, []);



    function handleDeleteInvite(id) {
        const deletar = window.confirm("Deseja deletar o convite?");
        if(deletar === true) {
            deleteInvite(id);
        } 
        
    }

    return (

        <div className="invitesList">

                {followers?.map((invite) => {
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

                <div id="sentinelaInvites">
                <div className="image">
                    <h4>Carregando...</h4>
                </div></div>


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