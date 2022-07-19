import './accounts.css'
import { useContext, useState } from "react";
import { AuthContext } from '../../../contexts/Auth';
import { useFetch } from '../../../hooks/useFetch';


function Accounts() {
    const {deleteAccount} = useContext(AuthContext);

        const [search, setSearch] = useState('');
        const [type, setType] = useState('username');
        const {data} = useFetch(`accounts`);
      
        
        const filterAccounts = data?.filter(account => account.city !== "" || account.uf !== "")

      let SearchUsers = []
      const searchLower = search.toLowerCase()
  
      if(data) {
          SearchUsers = filterAccounts?.filter((informations) => informations.username.toLowerCase().includes(searchLower)
                                                        || informations.email.toLowerCase().includes(searchLower)
                                                        || informations.id.toLowerCase().includes(searchLower) )
      }
  
    

      function handleDeleteAccount(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deleteAccount(id);
        } 
    }
      function handleViewPatron(id) {
       window.open(`/patron/${id}`, "_self")
    }

    function handleTypeSearch(e) {
        e.preventDefault();

        if(type === "username") {
            setType("email")
        } else {
                setType("username")
            }
    }
    
    if(!data) {
          return (
              <div className="load">
                  <h3>Carregando...</h3>
              </div>
          )
      }


    return (
           <div className="block">
                        <h4><b>Usuários cadastrados </b></h4>


                        <div className="informationAccount">
                        <div className="search">
                            {/* <div className="buttons">
                            <button className={type === "username" ? "" : "selected"} onClick={handleTypeSearch}>Nome de usuário</button>
                            <button className={type === "email" ? "" : "selected"} onClick={handleTypeSearch}>E-mail</button>
                            </div> */}
                          <input type="text" placeholder='Buscar usuário, id ou e-mail' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                            {
                                SearchUsers?.map((account) => {
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
                                                <button className='promote' onClick={() => {handleViewPatron(account.id)}}>Ver Apadrinhados</button>
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

    const filterAccounts = data?.filter(account => account.city !== "" || account.uf !== "")


    return (
          <>{filterAccounts?.length}</>
    )
}

export { Accounts, AccountsCounter }