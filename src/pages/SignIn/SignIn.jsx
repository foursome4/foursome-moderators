import './signIn.css';
import logoImg from '../../assets/logo.png'

function SignIn() {
    return(
        <div className="content">
    <div className='signIn'> 
        <div className="title">
            <img src={logoImg} alt="" />
        </div>
        <div className="data">
            <form action="">
                <input type="text" value="" placeholder='Nome de usuário ou E-mail'/>
                <div className="password">
                <input type="password" value="" placeholder='Senha'/>
                </div>
                <button>Entrar</button>
            </form>
        </div>
    </div>
        </div>
    )
}

export { SignIn }