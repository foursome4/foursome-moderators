import './signIn.css';
import logoImg from '../../assets/logo.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';

function SignIn() {
    useEffect(() => {
        if(localStorage.getItem("foursome") !== null) {
            window.open("/dashboard", "_self")
        }
    }, [])


    const {loginSession} = useContext(AuthContext);


    const [login, setLogin] = useState("");
    const [password, setpassword] = useState("");

    function handleLogin(e) {
        e.preventDefault()

        console.log({login, password});
      loginSession({login, password})
    }
    return(
        <div className="content">
    <div className='signIn'> 
        <div className="title">
            <img src={logoImg} alt="" />
        </div>
        <div className="data">
            <form action="">
                <input type="text" value={login} placeholder='Nome de usuário ou E-mail' onChange={(e) => setLogin(e.target.value)}/>
                <div className="password">
                <input type="password" value={password} placeholder='Senha' onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <button onClick={handleLogin}>Entrar</button>
            </form>
        </div>
    </div>
        </div>
    )
}

export { SignIn }