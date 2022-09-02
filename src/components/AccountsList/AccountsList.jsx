import './accountsList.css'
import { useContext, useState } from "react";
import { AuthContext } from '../../contexts/Auth';
import { useFetch } from '../../hooks/useFetch';


function AccountsList() {
    const {deleteAccount1, updateAccountStatus} = useContext(AuthContext);

        const [search, setSearch] = useState('');
        const [type, setType] = useState('username');
        const {data} = useFetch(`accounts`);

        if(data){
            console.log("Contas total:")
            console.log(data?.length)
        } 
      
        let filterAccounts = []
        if(data) {  
            filterAccounts = data?.filter(account => account.id !== "" || account.email !== "" || account.username !== "")
    }

      const searchLower = search

       const SearchUsers = filterAccounts?.filter((informations) => informations.id.includes(search)
                                                        || informations.email.includes(search)
                                                        || informations.username.includes(search))
 
  
    
        function handleBlockedAccount(id) {
            const status = "blocked";
            console.log(id, status)
          updateAccountStatus(id, status)
        }
        function handleBannerAccount(id) {
            const status = "banned";
            console.log(id, status)
            updateAccountStatus(id, status)
        }
        function handleLiberateAccount(id) {
            const status = "active";
            console.log(id, status)
            updateAccountStatus(id, status)
        }

      function handleDeleteAccount(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deleteAccount1(id);
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
                                            <h4>{account.type} - {account.status}</h4>
                                            </div>
                                            <div className="buttons">
                                                <button onClick={() => handleBlockedAccount(account.id)} className='blocked'>Bloquear</button>
                                                <button onClick={() => handleBannerAccount(account.id)} className='banned'>Banir</button>
                                                <button onClick={() => handleLiberateAccount(account.id)} className='promote'>Liberar</button>
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


export { AccountsList }