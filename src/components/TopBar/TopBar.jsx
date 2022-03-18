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
                    <a href="/dashboard" > Dashboard</a>
                    <a href="/feed" > Feed</a>
                    <a href="" > Convites</a>
                    <a href="" > Grupos</a>
                    <a href="" > Foruns</a>
                    <a href="" > Eventos</a>
                    <a href="" > Locais</a>
                </div>
            </div>
        </div>
    )
}

export { TopBar }