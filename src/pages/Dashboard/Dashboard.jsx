import { useEffect, useState } from 'react';
import { Accounts, AccountsCounter } from '../../components/Boxes/Accounts/Accounts';
import { PostPhotos, PostPhotosCounter } from '../../components/Boxes/PostPhotos/PostPhotos';
import { PostVideo, PostVideoCounter } from '../../components/Boxes/PostVideo/PostVideo';
import { InvitesCounter } from '../../components/Invites/Invites';
import { TopBar } from '../../components/TopBar/TopBar';
import api from '../../services/api';
import './dashboard.css';

function Dashboard() {
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local)

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [foruns, setForuns] = useState([]);
    const [events, setEvents] = useState([]);
    const [invites, setInvites] = useState([]);

    useEffect(() => {


        async function loadGroups(){
            await api.get("/groups").then((result) =>{
                setGroups(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }


        loadGroups();
    }, [])

    useEffect(() => {

        async function loadForunss(){
            await api.get("/foruns").then((result) =>{
                setForuns(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }

        loadForunss();
    }, [])

    useEffect(() => {

        async function loadEvents(){
            await api.get("/events").then((result) =>{
                setEvents(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }

        loadEvents();
    }, [])

    useEffect(() => {

        async function loadOnlineUsers(){
            await api.get("/online").then((result) =>{
                setOnlineUsers(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }

        loadOnlineUsers();
    }, []);

    useEffect(() => {

        async function loadInvites(){
            await api.get("/invites").then((result) =>{
                setInvites(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }

        loadInvites();
    }, [])

    return (
        <div className="content">
            <div className="dashboard">
                <TopBar />
                <div className="mainDashboard">
                <div className="title">
                    <h3>Olá {user.username}, seja bem-vindo de volta</h3>
                </div>
                <div className="blocks">
                 <Accounts />
                 <PostPhotos />
                 <PostVideo />               
                 </div>

                 <div className="mini-blocks">
                     <div className="mini">
                        <h4> Contas Criadas</h4>
                        <h4> <AccountsCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Fotos Postadas</h4>
                        <h4> <PostPhotosCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Videos postados</h4>
                        <h4> <PostVideoCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Grupos criados</h4>
                         <h4> {groups.length} </h4>
                     </div>
                     <div className="mini">
                        <h4> Foruns Criados</h4>
                         <h4> {foruns.length} </h4>
                     </div>
                     <div className="mini">
                        <h4> Eventos Criados</h4>
                        <h4> {events.length} </h4>
                     </div>
                     <div className="mini">
                        <h4> Convites</h4>
                        <h4> <InvitesCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> {onlineUsers.length} </h4>
                     </div>
                 </div>
                </div>

            </div>
        </div>
    )
}

export {Dashboard}