﻿import "./groups.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";
import { Group } from "../../components/Group/Group";

function Groups() {
const [avatar, setAvatar] = useState("")
const [id, setId] = useState("")
const [cover, setCover] = useState("")
const [name, setName ] = useState("")
const [description, setDescription] = useState("")
const [idAccount, setIdAcciunt] = useState("")
const [username, setUsername] = useState("")
const [theme, setTheme] = useState("")
const [avatarUser, setAvatarUser] = useState("")
    
const {data} = useFetch("/groups");
if(data){
    console.log(data)
}

function handleInfos(avatar, cover, name, description, idAccount, username, theme, avatarUser, id){
    console.log({avatar, cover, name, description, idAccount, username, theme, avatarUser, id})
    setAvatar(avatar);
    setCover(cover);
    setName(name);
    setDescription(description);
    setIdAcciunt(idAccount);
    setUsername(username);
    setTheme(theme);
    setAvatarUser(avatarUser);
    setId(id)
}

    return (
        <div className="content">
        <div className="groups">
            <Navbar />
            <h1>Grupos</h1>

            <div className="groups-list">
            <div className="listGroups">
                {data?.map((groups) => {
                    return (
                        <div className="GroupUnic" key={groups.id}>
                            <h4>{groups.name}</h4>
                            <div className="buttons">
                                <button onClick={() => handleInfos(groups.avatar, groups.cover, groups.name, groups.description, groups.idAccount, groups.username, groups.theme, groups.avatarUser, groups.id)}>Abrir</button>
                                <button className="btn2">Aprovar</button>
                                <button className="btn">Deletar</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="groupInformations">
                    <Group avatar={avatar} cover={cover} name={name} description={description} idAccount={idAccount} username={username} theme={theme} avatarUser={avatarUser} link={`/posts/groups/${id}`}/>
            </div>
            </div>
        </div>
        </div>
    )
}

export {Groups}