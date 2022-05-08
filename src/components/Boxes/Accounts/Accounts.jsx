import './accounts.css'
import { useContext } from "react";
import { AuthContext } from '../../../contexts/Auth';
import { useFetch } from '../../../hooks/useFetch';


function Accounts() {
    const {deleteAccount} = useContext(AuthContext);

    const {data} = useFetch(`/accounts`);
    
    function handleDeleteAccount(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deleteAccount(id);
        } 
        
        if(!data) {
            return (
                <h4>Carregando...</h4>
            )
        }
    

    }
    return (
           <div className="block">
                        <h4><b>Usuários cadastrados</b></h4>
                        <div className="informationAccount">
                            {
                                data?.map((account) => {
                                    return(
                                        <div className="account" key={account.id}>
                                            <div className="name">
                                            <h4>{account.id} - {account.username}</h4>
                                            <h4>{account.email}</h4>
                                            <h4>{account.type}</h4>
                                            </div>
                                            <div className="buttons">
                                                <button className='blocked'>Bloquear</button>
                                                <button className='banned'>Banir</button>
                                                <button className='promote'>Promover</button>
                                            </div>
                                            <div className="buttons2">
                                                <button className='banned2' onClick={() => {handleDeleteAccount(account.id)}}>Deletar conta</button>
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

    const {data} = useFetch(`/accounts`);

    if(!data) {
        return (
            <>Carregando...</>
        )
    }

    return (
          <>{data?.length}</>
    )
}

export { Accounts, AccountsCounter }