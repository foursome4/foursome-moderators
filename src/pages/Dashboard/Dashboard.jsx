import { useEffect, useState } from 'react';
import { Accounts, AccountsCounter, AccountsCounterAproveds, AccountsCounterPending } from '../../components/Boxes/Accounts/Accounts';
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
import { PaymentsNumbers } from '../../components/Boxes/PaymentsNumbers/PaymentsNumbers';
import { AccountsPayments } from '../../components/Boxes/AccountsNumbers/AccountsPayments';

function Dashboard() {
    const {logout} = useContext(AuthContext)
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local);

    const [online, setOnline] = useState([])
    const [login, setLogin] = useState([])

    useEffect(() => {
        async function loadUsersLoginDateActual() {
            await api.get("/datereadlogin").then((result) => {
                setLogin(result.data)
            }).catch((error) => {
                console.log(error);
            })
        }

        loadUsersLoginDateActual()
    })

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
            return;
        }

      deleteUsersOnline();
     }, 960000);

    function deleteUsersOnline() {
        console.log("Deletando registros")
        myFilter.forEach(async (users) => {
            if(users.idAccount === user.id) {
                return;
            }

            await api.delete(`/online/${users.idAccount}`).then((res) => {
            }).catch((error) => {
                console.log("Não deslogado")
                console.log(error)
            })
         })
    }

    const filterLogin = login.filter((login) =>
            new Date(login.created_at).getDate() === new Date().getDate())
            // new Date(login.created_at).getMonth() === new Date().getMonth())

    console.log(filterLogin);

    return (
        <div className="content">
            <div className="dashboard">
                <Navbar />
                <div className="mainDashboard">
                <div className="title">
                    <h3>Olá {user.username}, seja bem-vindo de volta <br /> {filterLogin.length} usuários logaram hoje</h3>
                </div>
                <div className="blocks">
                 <Accounts />    
                 <PaymentsNumbers />    
                 <AccountsPayments />     
                 </div>

                 <div className="mini-blocks">
                     <div className="mini">
                        <h5> Contas Criadas</h5>
                       <AccountsCounter />
                     </div>
                     <div className="mini">
                        <h5> Contas Aprovadas</h5>
                       <AccountsCounterAproveds />
                     </div>
                     <div className="mini">
                        <h5> Contas Pendentes</h5>
                        <AccountsCounterPending /> 
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