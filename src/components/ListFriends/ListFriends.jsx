import './listFriends.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';


function ListFriends({id, idRegister}) {
    const Local = localStorage.getItem("foursome");
    const myUser = JSON.parse(Local);

    const {deleteFriend} = useContext(AuthContext)

    const [friendAccount, setFriendAccount] = useState("");
    const [friendInformation, setFriendInformation] = useState("");

    useEffect(() => {
        async function loadAccount() {
            await api.get(`/accounts/filter/${id}`).then((result) => {
                setFriendAccount(result.data[0])
            })
        }

        async function loadInformation() {
            const idAccount = id;
            await api.get(`/informations/${idAccount}`).then((result) => {
                setFriendInformation(result.data[0])
            })
        }

        loadAccount();
        loadInformation();
    }, [])


    function handleDeleteFriend(e) {
        e.preventDefault()
       deleteFriend(idRegister)
    }


    return (
        <div className="listFriends">
           <div className="friendUnics">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <a href={friendAccount.id === myUser.id ? `/profile` : `/profile-friend/${friendAccount.id}`}> <h3>{friendInformation.nickname}</h3></a>
           { myUser.id === friendAccount.id ?
            <button onClick={handleDeleteFriend} > Remover </button>
            : ""
           }
            </div>
           </div>
        </div>
    )
}

export {ListFriends}