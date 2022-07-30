import "./accountsAproveds.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";

function AccountsAproveds() {
    const {deleteAccount1} = useContext(AuthContext);
    const [user, setUser] = useState([])


    
    function handleDeleteAccount(id) {
        console.log(id)
        deleteAccount1(id);
    }


    useEffect(() => {
        
        async function loadAccounts() {
           const res = await api.get("/accounts")
            console.log(res.data)
           res.data.forEach((account) => {
            async function loadInformations() {
                await api.get(`/informations/${account.id}`).then((res) => {
                    console.log(account.id)
                    console.log(account)
                    console.log(res.data)

                    const completeAccount = res.data[0] === undefined || res.data[0] === "" || res.data.length === 0 ? false : true;

                    const dados = {
                        id: account.id,
                        email: account.email,
                        username: account.username,
                        accountComplete: completeAccount,
                        patron: account.patron,
                        type: account.type,
                        role: account.role,
                        data: account.created_at,
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

const filterUsuarios = user.filter((informations) => informations.accountComplete === false)

    return (
        <div className="content">
        <div className="accounts">
            <Navbar />
            <h1>Contas de Usuário</h1>
            <h5>{filterUsuarios?.length}</h5>


            

            <div className="accounts-list">
                    {filterUsuarios?.map((account) => {
                        return (

                            <div className="unic" key={account.id}>
                                <div className="text">
                                    <h4>ID: {account.id}</h4>
                                    <h5>Username: {account.username}</h5>
                                    <h5>Email: {account.email}</h5>
                                    <h5>Account: {account.accountComplete}</h5>
                                </div>
                                <div className="text">
                                    <h4>Função: {account.role}</h4>
                                    <h5>Tipo: {account.type}</h5>
                                    <h5>Patron: {account.patron}</h5>
                                    <h5>Data: {account.data}</h5>
                                </div>
                                <div className="buttons">
                                   <button onClick={() => handleDeleteAccount(account.id)}className="delete">Deletar</button>
                                </div>
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