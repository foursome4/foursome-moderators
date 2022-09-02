import "./profiles.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useState } from "react";
import { Account } from "../../components/Account/Account";

function Profiles() {
    const [search, setSearch] = useState('');
const [id, setId] = useState("")
const [role, setRole ] = useState("")
const [status, setStatus ] = useState("")
const [avatar, setAvatar] = useState("")
const [cover, setCover] = useState("")
const [type, setType] = useState("")
const [username, setUsername] = useState("")
const [nickname, setNickname] = useState("")
const [city, setCity] = useState("")
const [uf, setUf] = useState("")
const [país, setPaís] = useState("")
    
const {data} = useFetch("/accounts");
if(data){
    console.log(data)
}

let filterAccounts = []
if(data) {  
    filterAccounts = data?.filter(account => account.id !== "" || account.email !== "" || account.username !== "")
}

const searchLower = search

const SearchUsers = filterAccounts?.filter((informations) => informations.id.includes(search)
                                                || informations.email.includes(search)
                                                || informations.username.includes(search))

function handleInfos(id, role, status, avatar, cover, type, username, nickname, city, uf, país){
    console.log({id, role, status, avatar, cover, type, username, nickname, city, uf, país});

    setId(id);
    setRole(role);
    setStatus(status);
    setAvatar(avatar);
    setCover(cover);
    setType(type);
    setUsername(username);
    setNickname(nickname);
    setCity(city);
    setUf(uf);
    setPaís(país);
}

    return (
        <div className="content">
        <div className="profiles">
            <Navbar />
            <h1>Perfil de usuário</h1>

            <div className="profiles-list">
            <div className="listprofiles">
            <input type="text" placeholder='Buscar usuário, id ou e-mail' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
                {SearchUsers?.map((groups) => {
                    return (
                        <div className="GroupUnic" key={groups.id}>
                            <h4><b>{groups.nickname}</b></h4>
                            <h4><b>{groups.id} - {groups.username} - {groups.status}</b></h4>
                            <h4><b>{groups.email}</b></h4>
                            <div className="buttons">
                                <button onClick={() =>
                                    handleInfos(groups.id, groups.role, groups.status, groups.avatar, groups.cover, groups.type, groups.username, groups.nickname, groups.city, groups.uf, groups.país)}
                                    >Abrir</button>
                                <button className="btn">Deletar</button>
                            </div>
                            <div className="buttons">
                                <button >Liberar</button>
                                <button className="btn2">Supender</button>
                                <button className="btn3">Bloquear</button>
                                <button className="btn">Banir</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="profileInformations">

                <Account id={id} role={role} status={status} avatar={avatar} cover={cover} type={type} username={username} nickname={nickname} city={city} uf={uf} país={país} link={`/posts/filter/accounts/${id}`}/>
                 </div>
            </div>
        </div>
        </div>
    )
}

export {Profiles}