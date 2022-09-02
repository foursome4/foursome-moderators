import { useEffect, useState } from "react"
import api from "../../services/api"
import { DateFormat } from "../DateFormat/DateFormat";
import './dataUserProfile.css'

function DataUserProfile({idAccount, id, username, avatar2, date}) {

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
            <img src={avatar2 === undefined ? avatar : avatar2} alt="Foto de perfil do usuário" />
            </div>
            <div className="text">
            <h4><b>{nickname}</b></h4>
            <h4><b>{id} - {username}</b></h4>
            </div>
        </div>
    )
}

export {DataUserProfile}