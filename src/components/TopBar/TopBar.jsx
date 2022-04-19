import { Link } from 'react-router-dom';
import './topBar.css';
import logo from '../../assets/logo.png'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';


function TopBar() {

    const {logout} = useContext(AuthContext)

    function handleLogout(e) {
        e.preventDefault();

        logout()
    }
    return (
        <div className="content">
            <div className="topBar">
                <div className="image">
                    <img src={logo} alt="" />
                </div>
                <div className="menu">
                    <Link to="/dashboard" > Dashboard</Link>
                    <Link to="/feed" > Feed</Link>
                    <Link to="/invites" > Convites</Link>
                    {/* <Link to="" > Grupos</Link>
                    <Link to="" > Foruns</Link>
                    <Link to="" > Eventos</Link>
                    <Link to="" > Locais</Link> */}

                    <button onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export { TopBar }