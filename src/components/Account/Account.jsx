import { useEffect, useState } from "react";
import api from "../../services/api";
import { FeedComponents } from "../FeedComponents/FeedComponents";
import {IoPeopleOutline, IoPersonOutline, IoLocationOutline } from 'react-icons/io5'
import "./account.css";
function Account({id, role, status, avatar, cover, type, username, nickname, city, uf, país, link}){
    const [informations, setInformations] = useState([])

    useEffect(() => {
        async function loadInformations() {
            await api.get(`/informations/${id}`).then((res) => {
                setInformations(res.data[0]);
                console.log(res.data[0])
            })
        }

        loadInformations()
    })



    return (
        <div className="Group">
           {id === undefined || id === "" ?
           <>
           <br />
           <br />
           <h2>Selecione um perfil</h2>
           </>
           :<>
            <div className="cover">
                <img src={cover === "" || cover === undefined || cover === null ? informations.cover: cover} alt="" />
            </div>
            <div className="avatar">
                <img src={avatar === "" || avatar === undefined || avatar === null ? informations.avatar: avatar} alt="" />
            </div>
            <h2>{nickname === "" || nickname === undefined || nickname === null ? informations.nickname: nickname}</h2>
            <h4>{type === "Casal" || type === "trisal" ? <IoPeopleOutline /> : <IoPersonOutline />} {username} - {type}</h4>
            <h5>{role} - {status === "lifetime" ? "Vitalício" : status}</h5>
            <br />
            <h3><IoLocationOutline />{city === "" || city === undefined || city === null ? informations.city: city} - {city === "" || city === undefined || city === null ? informations.uf: uf} - {país === "" || país === undefined || país === null ? informations.país: país}</h3>

            <FeedComponents link={link}/>
            </>}
        </div>
    )
}

export {Account}