import "./accounts.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useState } from "react";
import api from "../../services/api";

function Accounts() {
    const [select, setSelect] = useState("Complete")
    const {deleteAccount, updateAccount} = useContext(AuthContext);
    const {data} = useFetch(`/accounts/search/pending`);

    const [user, setUser] = useState([]);
    if(data) {
        console.log(data)
    }

    useEffect(() => {
        async function accountsLoad() {
            const res = await api.get("/accounts/search/pending");

            res.data.forEach(  (account) => {
                
                async function completeAccount() {
                    const carac = await api.get(`/characteristics/${account.id}`)
                    console.log(carac)
                    const pref = await api.get(`/preferences/${account.id}`)
                    console.log(pref)
                    const caracteristica = carac.data.length === 0 ? false : true
                    const preferencia = pref.data.length === 0 ? false : true

                    const data = {
                        id: account.id,
                        avatar: account.avatar,
                        nickname: account.nickname,
                        username: account.username,
                        email: account.email,
                        type: account.type,
                        city: account.city,
                        uf: account.uf,
                        patron: account.patron,
                        role: account.role,
                        phone: account.phone,
                        online: account.online,
                        cover: account.cover,
                        latitude: account.latitude,
                        longitude: account.longitude,
                        cep: account.cep,
                        relationship: account.relationship,
                        recommendation: account.recommendation,
                        status: account.status,
                        país: account.país,
                        caracteristica,
                        preferencia

                    }

                    setUser(oldUsers => [...oldUsers, data])
                }

                completeAccount()
             })
        }

        accountsLoad()
    }, [])

    console.log(user)

    function handleAprovedAccount(id, país, username, role, type, email, phone, online, patron, nickname, avatar,
        cover, relationship, city, uf, cep, latitude, longitude, recommendation) {
            const status = "active";

            updateAccount(id, país, username, role, type, email, phone, online, patron, nickname, avatar,
                cover, relationship, city, uf, cep, latitude, longitude, recommendation, status)
        }

        function handleSelect(data) {
                setSelect(data)
        }

        function handleDeleteAccount(id, email) {
            console.log(id)
            deleteAccount(id, email);
        }

        const filterAccounts = select === "Complete" ? user?.filter(account => account.caracteristica === true && account.preferencia === true)
                             : select === "Incomplete" ? user?.filter(account => account.caracteristica === false || account.preferencia === false)
                             : ""


        if(!data) {
            return (
                <h2>Carregando...</h2>
            )
        }
    return (
        <div className="content">
        <div className="accounts">
            <Navbar />
            <h1>Solicitações de entrada</h1>
            <h4>{filterAccounts?.length} solicitações</h4>

            {/* <div className="buttonsSelect">
                <button onClick={() => {handleSelect("Complete")}}>Contas completas</button>
                <button onClick={() => {handleSelect("Incomplete")}}>Contas incompletas</button>
            </div> */}


            

            <div className="accounts-list">
                    {filterAccounts?.map((account) => {
                        return (

                            <div className="unic" key={account.id}>
                                <div className="avatar">
                                    <img src={account.avatar} alt="" />
                                </div>
                                <div className="text">
                                    <h4>Nickname: {account.nickname}</h4>
                                    <h5>Username: {account.username}</h5>
                                    <h5>Email: {account.email}</h5>
                                    <h5>Tipo de conta: {account.type}</h5>
                                </div>
                                <div className="text">
                                    <h4>Cidade: {account.city}</h4>
                                    <h5>Estado: {account.uf}</h5>
                                    <h5>País: {account.país}</h5>
                                    <h5>Patron: {account.patron}</h5>
                                </div>
                                <div className="buttons">
                                   <button onClick={() => handleAprovedAccount(account.id, account.país, account.username, account.role, account.type,
account.email, account.phone, account.online, account.patron, account.nickname, account.avatar,
account.cover, account.relationship, account.city, account.uf, account.cep, account.latitude,
account.longitude, account.recommendation)}>Aprovar</button>
                                   <button onClick={() => handleDeleteAccount(account.id, account.email)}className="delete">Reprovar</button>
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

export {Accounts}