import "./accountsAproveds.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import { toast } from "react-toastify";

function AccountsAproveds() {
    const {deleteAccount1, emailAccountAproved} = useContext(AuthContext);
    const [user, setUser] = useState([])


    
    function handleDeleteAccount(id) {
        console.log(id)
        deleteAccount1(id);
    }
    function handleAprovvdAccount(email) {
        console.log(email)
        emailAccountAproved(email);
    }


    useEffect(() => {
        
        async function loadAccounts() {
           const res = await api.get("/conversations")
            console.log(res.data)
           res.data.forEach((conversations) => {
            async function loadInformations() {
                await api.get(`/accounts/filter/${conversations.idFriend}`).then((res) => {
                    console.log(conversations.id)
                    console.log(conversations)
                    console.log(res.data)

                    const completeconversations = res.data[0] === undefined || res.data[0] === "" || res.data.length === 0 ? false : true;

                    const dados = {
                        id: conversations.id,
                        room: conversations.room,
                        idAccount: conversations.idAccount,
                        idFriend: conversations.idFriend,
                        conversationsComplete: completeconversations,
                        data: conversations.created_at,
                    }
    
                    setUser(oldUsers => [...oldUsers, dados])

  
                  }).catch((error) => {
                      console.log(error)
                  })  
            }
                             
            loadInformations()
           })
        }

        loadAccounts()
    }, [])

const filterUsuarios = user.filter((informations) => informations.conversationsComplete === false);
const limitData = filterUsuarios?.slice(0,100)

function deleteConversations() {
    filterUsuarios.forEach((conversations) => {
        async function deleteConversationsAll() {
            await api.delete(`/conversations/${conversations.id}`).then((response) => {
                toast.success("Conversa deletada")
                console.log("Conversa deletada")
                console.log(conversations.id)
            }).catch((error) => {
                console.log(error)
            })
        }

        deleteConversationsAll()
    })
}




    return (
        <div className="content">
        <div className="AccountsAproveds">
            <Navbar />
            <h1>Conversas vazias</h1>
            <h5>{filterUsuarios?.length}</h5>
            <h1>Conversas vazias</h1>
            <h5>{limitData?.length}</h5>


<button onClick={deleteConversations}>Deletar todas</button>

            

            <div className="AccountsAproveds-list">
                    {filterUsuarios?.map((account) => {
                        return (

                            <div className="unic" key={account.id}>
                                <div className="text">
                                    <h4>ID: {account.id}</h4>
                                    <h5>Sala: {account.room}</h5>
                                    <h5>idAccount: {account.idAccount}</h5>
                                    <h5>idFriend: {account.idFriend}</h5>
                                    <DateFormat date={account.data}/>
                                </div>

                                {/* <div className="buttons">
                                   <button onClick={() => handleDeleteAccount(account.id)}className="delete">Deletar</button>
                                   <button onClick={() => handleAprovvdAccount(account.email)}className="delete">Reenviar</button>
                                </div> */}
                            </div>

                            )
                        })
                    }

            </div>
        </div>
        </div>
    )
}

export {AccountsAproveds}