import { Accounts, AccountsCounter } from '../../components/Boxes/Accounts/Accounts';
import { PostPhotos, PostPhotosCounter } from '../../components/Boxes/PostPhotos/PostPhotos';
import { PostVideo, PostVideoCounter } from '../../components/Boxes/PostVideo/PostVideo';
import { EventsCounter } from '../../components/Counters/EventsCounter/EventsCounter';
import { ForunsCounter } from '../../components/Counters/ForunsCounter/ForunsCounter';
import { GroupsCounter } from '../../components/Counters/GroupsCounter/GroupsCounter';
import { OnlineCounter } from '../../components/Counters/OnlineCounter/OnlineCounter';
import { InvitesCounter } from '../../components/Invites/Invites';
import Navbar from '../../components/Nav/Navbar';
import './dashboard.css';

function Dashboard() {
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local)

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