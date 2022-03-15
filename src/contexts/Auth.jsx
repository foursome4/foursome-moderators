import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {toast} from 'react-toastify';
import { socket } from '../services/websocket';



const AuthContext = createContext({});

function AuthProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState("")

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem("foursome");

        if(storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
            socket.on("connection", () => {
                console.log("Conexão estabelecida")
            })
        }
        setLoading(false);
        }      
               
               loadStorage(); 
    },[]);



    async function loginSession({login, password}) {     
       
        let email;
        let username;
        console.log(login);
        console.log(password);
        
        if(login.includes('@')) {
            email = login
            await api.post("/session", {email, password}).then((result) => {
                console.log(result.data)
                const data = result.data;
                if(result.data.role === "Moderador" || result.data.role === "Administrador") {
                localStorage.setItem("foursome", JSON.stringify(data));
                console.log("Login realizado com sucesso!");
                setLoading(false);
                navigate("/dashboard")
            } else {
                toast.error("Você não tem permissão para acessar esta área")
            }
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
            
        } else {
            username = login
            await api.post("/session", {username, password})
            .then((result) => {
                console.log(result.data)
                if(result.data.role === "Moderador" || result.data.role === "Administrador") {
                    const data = result.data;
                localStorage.setItem("foursome", JSON.stringify(data));
                console.log("Login realizado com sucesso!");
                setLoading(false);
                navigate("/dashboard")
            } else {
                toast.error("Você não tem permissão para acessar esta área")
            }
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
        }
        
    }




 

    function logout() {
        localStorage.removeItem("foursome");
        localStorage.removeItem("informations-foursome");
        setUser(null);
        navigate("/");

        window.location.reload(false)
    }

 

    return(
        <AuthContext.Provider value={{
            logout,
            loginSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}