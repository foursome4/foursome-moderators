import { useContext, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useParams } from 'react-router';

import './signUp.css';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function SignUp() {
  const {email} = useParams()
  const  {createAccount} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [patron, setPatron] = useState("");
  const [password, setPassword] = useState("");
  const [passordConfirm, setPassordConfirm] = useState("");
  const [passwordView, setPasswordView] = useState(false)
  const [checked, setChecked] = useState(false);

  function handleCreateAccount(e) {
    e.preventDefault();
    const status = "active"; // Test = 7 Dias -- Active = Palno Ativo/Pago -- Bloqued = Plano Bloqueado/ Não pago-expirado -- Banned 
    const role = "Membro";
    const online = false;

    if(checked) {
        if(passordConfirm === password) {
         createAccount(username, email, phone, type, password, status, role, code, online, patron)
          console.log( username, email, phone, type, password, status, role, code, online, patron)
        } else {
          toast.error("As senhas não combinam!")
        }
    } else {
      toast.error("Favor, confirmar a leitura do termo de uso")
    }
  }

  function handleSetectType(e) {
    setType(e.target.value)
    console.log(e.target.value)
  }

  function handleChange(e) {
    setChecked(true)
  }

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }

  return (
    <div className="content">
      <div className="signUp">
        <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        <h2>Seja bem-vindo!</h2>
        <h3>Realize seu cadastro e aproveite tudo que preparamos.</h3>
        </div>
        <div className="form">
        <div className="title">
            <h3>CADASTRE-SE</h3>
          </div>
          <input type="text" placeholder="E-mail" value={email} disabled/>
          <input type="text" placeholder="Código de verificação" value={code} onChange={(e) => setCode(e.target.value)} />
          <input type="text" placeholder="Id do Patrono" value={patron} onChange={(e) => setPatron(e.target.value)} />
          <input type="text" placeholder="Username" value={username.toLowerCase()} onChange={(e) => setUsername(e.target.value)}/>
          <select value={type} onChange={handleSetectType}>
                                <option value="">Tipo de conta</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher </option>
                                <option value="Casal">Casal </option>
                                <option value="Trisal">Trisal </option>
                                <option value="Transex">Transex </option>
                                <option value="Travestis">Travestis </option>
                            </select>
          <input type="tel" placeholder="Telefone" pattern="([0-9]{2})[0-9]{5}-[0-9]{4}" value={phone} onChange={(e) => setPhone(e.target.value)}/>

          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>

          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Confirmar senha" value={passordConfirm} onChange={(e) => setPassordConfirm(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>


          <div className="terms">
          <input type="checkbox" checked={checked} onChange={handleChange}/>
          <span>Li e concordo com os <strong>Termos de uso</strong></span>
          </div>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Cadastrar </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export { SignUp }

       