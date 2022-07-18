import "./accounts.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

function Accounts() {
    const {deleteAccount, mailAccountRecused, emailAccountAproved, updateAccount} = useContext(AuthContext);
    const {data} = useFetch(`/accounts/search/pending`);
    if(data) {
        console.log(data)
    }

    function handleAprovedAccount(id, país, username, role, type, email, phone, online, patron, nickname, avatar,
        cover, relationship, city, uf, cep, latitude, longitude, recommendation) {
            const status = "Aproved";

            updateAccount(id, país, username, role, type, email, phone, online, patron, nickname, avatar,
                cover, relationship, city, uf, cep, latitude, longitude, recommendation, status)

                emailAccountAproved(email)

                
        }

        function handleDeleteAccount(id, email) {
            console.log(id)
            deleteAccount(id);
            mailAccountRecused(email)
        }


        if(!data) {
            return (
                <h2>Carregando...</h2>
            )
        }
    return (
        <div className="content">
        <div className="accounts">
            <Navbar />
            <h1>Contas de Usuário!!!</h1>
            <h5>{data?.length}</h5>




            <div className="accounts-list">
                    {data?.map((account) => {
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
account.cover, account.relationship, account.city, account.uf, account.ep, account.latitude,
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