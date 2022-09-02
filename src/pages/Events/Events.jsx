import "./events.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";
import { Group } from "../../components/Group/Group";
import { Event } from "../../components/Event/Event";

function Events() {
const [id, setId] = useState("")
const [avatar, setAvatar] = useState("")
const [cover, setCover] = useState("")
const [name, setName ] = useState("")
const [description, setDescription] = useState("")
const [idAccount, setIdAccount] = useState("")
const [username, setUsername] = useState("")
const [nickname, setNickname] = useState("")
const [theme, setTheme] = useState("")
const [avatarUser, setAvatarUser] = useState("")

const [status, setStatus] = useState("")
const [date, setDate] = useState("")
const [street, setStreet] = useState("")
const [number, setNumber] = useState("")
const [district, setDistrict] = useState("")
const [city, setCity] = useState("")
const [uf, setUf] = useState("")
const [complement, setComplement] = useState("")
const [reference, setReference] = useState("")
    
const {data} = useFetch("/events");
if(data){
    console.log(data)
}



function handleInfos(avatar, cover, name, description, idAccount, username,nickname, theme, avatarUser, id, status, date, street, number, district, city, uf, complement, reference){
    console.log({avatar, cover, name, description, idAccount, username,nickname, theme, avatarUser, id, status, date, street, number, district, city, uf, complement, reference})
    setAvatar(avatar);
    setCover(cover);
    setName(name);
    setDescription(description);
    setIdAccount(idAccount);
    setUsername(username);
    setNickname(nickname);
    setTheme(theme);
    setAvatarUser(avatarUser);
    setId(id);
    setStatus(status)
    setDate(date)
    setStreet(street)
    setNumber(number)
    setDistrict(district)
    setCity(city)
    setUf(uf)
    setComplement(complement)
    setReference(reference)
}

    return (
        <div className="content">
        <div className="events">
            <Navbar />
            <h1>Eventos</h1>

            <div className="events-list">
            <div className="listevents">
                {data?.map((groups) => {
                    return (
                        <div className="eventsUnic" key={groups.id}>
                            <h4>{groups.name}</h4>
                            <div className="buttons">
                                <button onClick={() =>
                                    handleInfos(groups.avatar, groups.cover, groups.name, groups.description, groups.idAccount,
                                    groups.username, groups.nickname, groups.theme, groups.avatarUser, groups.id,
                                    groups.status, groups.date, groups.street, groups.number, groups.district, groups.city, groups.uf, groups.complement, groups.reference)}>Abrir</button>
                                <button className="btn2">Aprovar</button>
                                <button className="btn">Deletar</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="eventsInformations">
                    <Event avatar={avatar} cover={cover} name={name} description={description} idAccount={idAccount}
                    username={username} nickname={nickname} theme={theme} avatarUser={avatarUser} link={`/posts/events/${id}`}
                    // adrress={`${street}, ${district}, n${number}, ${complement},  - ${district} - ${city} - ${uf} - ${reference}`} date={date}
                    adrress={`${district} - ${city} - ${uf}`} date={date}
                    />
            </div>
            </div>
        </div>
        </div>
    )
}

export {Events}