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
                    <Link href="/dashboard" > Dashboard</Link>
                    <Link href="/feed" > Feed</Link>
                    <Link href="" > Convites</Link>
                    <Link href="" > Grupos</Link>
                    <Link href="" > Foruns</Link>
                    <Link href="" > Eventos</Link>
                    <Link href="" > Locais</Link>

                    <button onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export { TopBar }