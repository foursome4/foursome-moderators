import { useEffect, useState } from 'react';
import { Accounts, AccountsCounter } from '../../components/Boxes/Accounts/Accounts';
import { PostPhotos, PostPhotosCounter } from '../../components/Boxes/PostPhotos/PostPhotos';
import { PostVideo, PostVideoCounter } from '../../components/Boxes/PostVideo/PostVideo';
import { EventsCounter } from '../../components/Counters/EventsCounter/EventsCounter';
import { ForunsCounter } from '../../components/Counters/ForunsCounter/ForunsCounter';
import { GroupsCounter } from '../../components/Counters/GroupsCounter/GroupsCounter';
import { OnlineCounter } from '../../components/Counters/OnlineCounter/OnlineCounter';
import { InvitesCounter } from '../../components/Invites/Invites';
import Navbar from '../../components/Nav/Navbar';
import api from '../../services/api';
import './dashboard.css';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function Dashboard() {
    const {logout} = useContext(AuthContext)
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local);

    const [online, setOnline] = useState([])
    useEffect(() => {
        async function onlineUsers() {
            const res = await api.get("online");
            console.log("Oline");
            console.log(res.data)

            res.data.forEach((user) => {
                async function loadInformations() {
                    console.log(user.idAccount)
                    await api.get(`/datereadlogin/${user.idAccount}`).then((res) => {
      
                        console.log(res.data[0].DateReadLogin)
                        var d1 = res.data[0] === undefined ? new Date(user.created_at) : new Date(res.data[0].DateReadLogin);
                        var d2 = new Date();
                        console.log(d1)
                        console.log(d2)
                        var diff = moment(d2,"DD/MM/YYYY HH:mm:ss").diff(moment(d1,"DD/MM/YYYY HH:mm:ss"));
                        console.log(diff)
                        var valor = moment.duration(diff).asDays();
                        console.log(valor)
                        var dias = Math.round(valor, 1);
                        console.log(dias)

                          const dados = {
                              idAccount: user.idAccount,
                              username: user.username,
                              daysOnline: dias        
                          }

                          console.log(dados)
                          
                          setOnline(oldOnline => [...oldOnline, dados])

      
                      }).catch((error) => {
                          console.log(error)
                      })  
                      console.log("Fim de Festa");
                }

                loadInformations()
 
       })
            
        }

        onlineUsers()
    }, [])


    const myFilter = online.filter((user) => user.daysOnline > 0);
    console.log(myFilter)
    function deleteUsersOnline() {
        myFilter.forEach((user) => {
            logout(user.idAccount)
         })
    }

    function StartFunction() {
        console.log("Starting")
        setTimeout(console.log(new Date()), 500)
    }
    
    StartFunction()

    return (
        <div className="content">
            <div className="dashboard">
                <Navbar />
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
                         <h4> <GroupsCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Foruns Criados</h4>
                         <h4> <ForunsCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Eventos Criados</h4>
                        <h4> <EventsCounter /></h4>
                     </div>
                     <div className="mini">
                        <h4> Convites</h4>
                        <h4> <InvitesCounter /> </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> <OnlineCounter /></h4>
                     </div>
                 </div>
                </div>

            </div>
        </div>
    )
}

export {Dashboard}