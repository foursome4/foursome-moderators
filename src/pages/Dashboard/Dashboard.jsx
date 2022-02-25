import { TopBar } from '../../components/TopBar/TopBar';
import './dashboard.css';

function Dashboard() {
    return (
        <div className="content">
            <div className="dashboard">
                <TopBar />
                <div className="title">
                    <h3>Olá Jeferson, seja bem-vindo de volta</h3>
                </div>
                <div className="blocks">
                    <div className="block">
                        <h4>Usuários cadastrados</h4>
                        <div className="information">

                        </div>
                        <h5>Total: </h5>
                    </div>
                   
                    <div className="block">
                        <h4>Fotos</h4>
                        <div className="information">
                            
                        </div>
                        <h5>Total: </h5>
                    </div>
                   
                    <div className="block">
                        <h4>Vídeos</h4>
                        <div className="information">
                            
                        </div>
                        <h5>Total: </h5>
                    </div>
                   
                    <div className="block">
                        <h4>Posts</h4>
                        <div className="information">
                            
                        </div>
                        <h5>Total: </h5>
                    </div>
                 </div>

                 <div className="mini-blocks">
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                 </div>
            </div>
        </div>
    )
}

export {Dashboard}