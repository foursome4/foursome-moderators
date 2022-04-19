import { useEffect, useState } from "react"
import api from "../../services/api"
import './dataUser.css'

function DataUser({idAccount, id}) {

    const [avatar, setAvatar] = useState("")
    const [nickname, setNickname] = useState("");


        useEffect(() => {
        async function loadInformations() {
            await api.get(`/informations/${idAccount}`).then((res) => {
                setAvatar(res.data[0].avatar);
                setNickname(res.data[0].nickname);
            })
        }

        loadInformations()
    })


    return (
        <div className="dataUser">
            <div className="image">
            <img src={avatar} alt="Foto de perfil do usuário" />
            </div>
            <h4>{nickname}</h4>
        </div>
    )
}

export {DataUser}