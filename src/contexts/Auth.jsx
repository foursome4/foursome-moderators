import {createContext, useEffect, useState} from 'react';
import api from '../services/api';
import {toast} from 'react-toastify';
import { socket } from '../services/websocket';



const AuthContext = createContext({});

function AuthProvider({children}) {
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

    console.log(user);
    console.log(loading);

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
                window.open("/dashboard","_self")
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
                window.open("/dashboard","_self")
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


    //Deletando conta


async function deleteAccount(id) {
    toast.success("Deletendo sua conta")
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const res = await api.delete(`/accounts/${id}`);
    if(res.status===201) {
        toast.info("Deletando informações") 
        deleteInformations(id)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteInformations(id) {
    const Local = localStorage.getItem("informations-foursome");
    const user = JSON.parse(Local);

    const res = await api.delete(`/informations/${id}`);
    if(res.status===201) {
        deleteCharacteristcs(id)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function deleteCharacteristcs(id) {
    const Local = localStorage.getItem("characteritics-foursome");
    const user = JSON.parse(Local);
    const res = await api.delete(`/characteristics/${id}`);
    if(res.status===201) {
        deletePreferences(id)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function deletePreferences(id) {
    const Local = localStorage.getItem("preferences-foursome");
    const user = JSON.parse(Local);

    const res = await api.delete(`/preferences/${id}`);
    if(res.status===201) {
        toast.success("Conta deletada com sucesso")   ;
        window.open("/", "_self")    
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

//Fim deletando conta


// Deletando posts, comentários, respostas, Convites

async function deletePost(id) {
    const res = await api.delete(`/posts/${id}`);
    if(res.status===201) {
        toast.success('Post deletado com sucesso!');
        window.location.reload(false)
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteComment(id) {
    const res = await api.delete(`/comments/${id}`);
    if(res.status===201) {
        toast.success('Comentário deletado com sucesso!');
        window.location.reload(false)
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteReply(id) {
    const res = await api.delete(`/reply/${id}`);
    if(res.status===201) {
        toast.success('Resposta deletada com sucesso!');
        window.location.reload(false)
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteInvite(id) {
    const res = await api.delete(`/invites/${id}`);
    if(res.status===201) {
        toast.success('Convite deletado com sucesso!');
        window.location.reload(false)
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
// fim deletando...



// Deletando grupo, forum e evento
async function deleteGroup(id){
    await api.delete(`/groups/${id}`).then(() => {
        window.location.reload(false)
    })
}
async function deleteEvents(id){
    await api.delete(`/events/${id}`).then(() => {
        window.location.reload(false)
    })
}
async function deleteForuns(id){
    await api.delete(`/foruns/${id}`).then(() => {
        window.location.reload(false)
    })
}


//Fim deletando


 

    async function logout(idAccount) {
        localStorage.removeItem("foursome");
        localStorage.removeItem("informations-foursome");
        await api.delete(`/online/${idAccount}`)
        window.location.reload(false)
    }

 

    return(
        <AuthContext.Provider value={{
            logout,
            loginSession,
            deleteAccount,
            deletePost,
            deleteComment,
            deleteReply,
            deleteInvite,
            deleteGroup,
            deleteEvents,
            deleteForuns
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}