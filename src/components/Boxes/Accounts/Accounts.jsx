import './accounts.css'
import { useEffect, useState } from "react"
import api from '../../../services/api';


function Accounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function loadAccounts(){
            await api.get("/accounts").then((result) =>{
                setAccounts(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        loadAccounts()
    })
    return (
           <div className="block">
                        <h4><b>Usuários cadastrados</b></h4>
                        <div className="informationAccount">
                            {
                                accounts.map((account) => {
                                    return(
                                        <div className="account" key={account.id}>
                                            <div className="name">
                                            <h4>{account.id} - {account.username}</h4>
                                            </div>
                                            <div className="buttons">
                                                <button className='blocked'>Bloquear</button>
                                                <button className='banned'>Banir</button>
                                                <button className='promote'>Promover</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
    )
}


function AccountsCounter() {
    const [accountsCounter, setAccountsCounter] = useState([]);

    useEffect(() => {
        async function loadAccounts(){
            await api.get("/accounts").then((result) =>{
                setAccountsCounter(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        loadAccounts()
    })
    return (
          <>{accountsCounter.length}</>
    )
}

export { Accounts, AccountsCounter }