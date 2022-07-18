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
import { toast } from 'react-toastify';

function Dashboard() {
    const {logout} = useContext(AuthContext)
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local);

    const [online, setOnline] = useState([])
    useEffect(() => {
        async function onlineUsers() {
            const res = await api.get("online");

            res.data.forEach((user) => {
                async function loadInformations() {
                    await api.get(`/datereadlogin/${user.idAccount}`).then((res) => {
      
                        var d1 = res.data[0] === undefined ? new Date(user.created_at) : new Date(res.data[0].DateReadLogin);
                        var d2 = new Date();
                        var diff = moment(d2,"DD/MM/YYYY HH:mm:ss").diff(moment(d1,"DD/MM/YYYY HH:mm:ss"));
                        var valor = moment.duration(diff).asDays();
                        var dias = Math.round(valor, 1);


                          const dados = {
                              idAccount: user.idAccount,
                              username: user.username,
                              daysOnline: dias        
                          }

                          
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
    setInterval(function () { 
        console.log(myFilter);
        if(myFilter.length === 0) {
            console.log("Sem registros para deletar")
            return;
        }

      deleteUsersOnline();
     }, 960000);

    function deleteUsersOnline() {
        console.log("Deletando registros")
        myFilter.forEach(async (users) => {
            if(users.idAccount === user.id) {
                console.log("Meu Id, identificado")
                return;
            }

            await api.delete(`/online/${users.idAccount}`).then((res) => {
                console.log(`Usuário deslogado: ${users.idAccount}`)
            }).catch((error) => {
                console.log("Não deslogado")
                console.log(error)
            })
         })
    }

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
                        <h5> Contas Criadas</h5>
                       <AccountsCounter />
                     </div>
                     <div className="mini">
                        <h5> Contas Aprovadas</h5>
                       <AccountsCounter />
                     </div>
                     <div className="mini">
                        <h5> Contas Pendentes</h5>
                        <AccountsCounter /> 
                     </div>
                     <div className="mini">
                        <h5> Fotos Postadas</h5>
                        <PostPhotosCounter />
                     </div>
                     <div className="mini">
                        <h5> Videos postados</h5>
                     <PostVideoCounter /> 
                     </div>
                     <div className="mini">
                        <h5> Grupos criados</h5>
                          <GroupsCounter /> 
                     </div>
                     <div className="mini">
                        <h5> Foruns Criados</h5>
                          <ForunsCounter /> 
                     </div>
                     <div className="mini">
                        <h5> Eventos Criados</h5>
                       <EventsCounter />
                     </div>
                     <div className="mini">
                        <h5> Eventos Aprovados</h5>
                      <EventsCounter />
                     </div>
                     <div className="mini">
                        <h5> Eventos Pendentes</h5>
                        <EventsCounter />
                     </div>
                     <div className="mini">
                        <h5> Convites</h5>
                        <InvitesCounter /> 
                     </div>
                     <div className="mini">
                        <h5> Usuários Online</h5>
                        <OnlineCounter />
                     </div>
                 </div>
                </div>

            </div>
        </div>
    )
}

export {Dashboard}