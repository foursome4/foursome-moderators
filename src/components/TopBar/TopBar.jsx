import { Link } from 'react-router-dom';
import './topBar.css';
import logo from '../../assets/logo.png'


function TopBar() {
    return (
        <div className="content">
            <div className="topBar">
                <div className="image">
                    <img src={logo} alt="" />
                </div>
                <div className="menu">
                    <a href="" > Dashboard</a>
                    <a href="" > Usuários</a>
                    <a href="" > Feed</a>
                    <a href="" > Convites</a>
                    <a href="" > Grupos</a>
                    <a href="" > Foruns</a>
                    <a href="" > Eventos</a>
                    <a href="" > Locais</a>
                    <a href="" > Mensagens</a>
                </div>
            </div>
        </div>
    )
}

export { TopBar }