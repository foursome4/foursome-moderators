import { useContext, useState } from 'react';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import './preferencesForm.css'

function PreferencesForm() {
    const {preferencesAccount} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const [homem, setHomem] = useState("");
    const [mulher, setMulher] = useState("");
    const [casal, setCasal] = useState("");
    const [trisal, setTrisal] = useState("");
    const [travestis, setTravestis] = useState("");
    const [transexuais, setTransexuais] = useState("");
    const [grupos, setGrupos] = useState("");

    
    function handlePreferences(e) {
        e.preventDefault();
        console.log({idAccount: user.id, homem, mulher, casal, trisal, travestis, transexuais, grupos})

        preferencesAccount({idAccount: user.id, men:homem, woman:mulher, couple:casal, trisal:trisal, transvestites:travestis, transsexuals:transexuais, groups:grupos})
    }

    function handleSelectHomem(e) {
        if(homem === "") {
            setHomem(e.target.value);
        } else {
            setHomem("");
        }
    }
    function handleSelectMulher(e) {
        if(mulher === "") {
            setMulher(e.target.value);
        } else {
            setMulher("");
        }
    }
    function handleSelectCasal(e) {
        if(casal === "") {
            setCasal(e.target.value);
        } else {
            setCasal("");
        }
    }
    function handleSelectTrisal(e) {
        if(trisal === "") {
            setTrisal(e.target.value);
        } else {
            setTrisal("");
        }
    }
    function handleSelectTravestis(e) {
        if(travestis === "") {
            setTravestis(e.target.value);
        } else {
            setTravestis(e.target.value);
        }
    }
    function handleSelectTransexuais(e) {
        if(transexuais === "") {
            setTransexuais(e.target.value);
        } else {
            setTransexuais("");
        }
    }
    function handleSelectGrupos(e) {
        if(grupos === "") {
            setGrupos(e.target.value);
        } else {
            setGrupos("");
        }
    }


    return (

            <div className="preferencesForm">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Preferências</h2>
                    </div>
                        <form action="">
                    <div className="data">                      
                   
                    <div className="search">
                        <input type="checkbox" value="Homem" onChange={handleSelectHomem}/><span>Homem</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Mulher" onChange={handleSelectMulher}/><span>Mulher</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Casal" onChange={handleSelectCasal}/><span>Casal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Trisal" onChange={handleSelectTrisal}/><span>Trisal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Travestis" onChange={handleSelectTravestis}/><span>Travestis</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Transexuais" onChange={handleSelectTransexuais}/><span>Transexuais</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value="Grupos" onChange={handleSelectGrupos}/><span>Grupos</span>
                    </div>



                    </div>
                    <div className='confirmation'>
                        <div className="confirmation_preferencesForm">
                        <input type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <button onClick={handlePreferences}>Salvar e Avançar</button>
                    </div>
                        </form>
            </div>
    )
}

export {PreferencesForm}