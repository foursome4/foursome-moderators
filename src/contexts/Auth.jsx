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

    // Resend Email 
    async function resendMail(id, email,code, idAccount, username, name, phone, type) {
        const mail = email;
        const patronNickname = username;
        const patron = idAccount
        const active = true
        const resend = true
        const data = {mail, code, patron, patronNickname, name, type}
        const data2 = {email, code, idAccount, username, name, phone, type, active, resend}

        console.log(data)
        console.log(data2)
        const res = await api.post("/mail/reinvite", data)
            if(res.status === 200) {
                toast.success("E-mail Reenviado com sucesso!")
              
                const res = await api.patch(`/invites/${id}`, data2)
                     if(res.status === 201) {
                         toast.success("Convite alterado com sucesso!")
                     }
            }

 

    }

        // async function completeAccount(email) {
    //     const res = await api.post("/mail/confirmation", {mail: email});
    //     if(res.status === 200) {
    //     }
    // }


    async function updateAccount(id, país, username, role, type, email, phone, online, patron, nickname, avatar,
        cover, relationship, city, uf, cep, latitude, longitude, recommendation, status) {
        const data = {país, username, role, type, email, phone, online, patron, nickname, avatar,
            cover, relationship, city, uf, cep, latitude, longitude, recommendation, status}
            console.log(data)
    await   api.patch(`/accounts/${id}`, data).then(async res => {
        toast.success("Conta Aprovada")
        emailAccountAproved(email)
    }).catch(error => {
        toast.error("Falha na aprovação")
    })
}

    //Deletando conta
async function deleteAccount(id, email) {
    toast.success("Deletando sua conta")

    const res = await api.delete(`/accounts/${id}`);

    if(res.status===201) {
        toast.info("Deletando informações") 
        deleteInformations(id)
        emailAccountRecused(email)
        
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteInformations(idAccount) {
    toast.success("Deletando informações")

    await api.delete(`/informations/${idAccount}`).then((res) => {
        deleteCharacteristcs(idAccount)
    }).catch((error) => {
        console.log(error)
        toast.error('Falha ao deletar, tente novamente!');
    })
}



async function deleteAccount1(id) {
    toast.success("Deletando conta de usuário")

    const res = await api.delete(`/accounts/${id}`);

    if(res.status===201) {
        toast.info("Deletando informações") 
        deleteInformations1(id)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteInformations1(idAccount) {
    toast.success("Deletando informações")

    const res = await api.delete(`/informations/${idAccount}`).then((res) => {
        deleteCharacteristcs(idAccount)
    }).catch((error) => {
        console.log(error)
        toast.error('Falha ao deletar, tente novamente!');
    })
}
async function deleteCharacteristcs(idAccount) {
    console.log(idAccount)
    toast.success("Deletando Caracteristicas")
    const res = await api.get(`/characteristics/${idAccount}`)
    console.log(res.data)
    res.data.forEach(async (user) => {
        console.log(user.idAccount)
     await api.delete(`/characteristics/${user.idAccount}`);
     deletePreferences(user.idAccount)
    })
}
async function deletePreferences(idAccount) {
    toast.success("Deletando Preferencias")
    const res = await api.delete(`/preferences/${idAccount}`);
    if(res.status===201) {
        deletePostsUser(idAccount) 
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deletePostsUser(idAccount) {
    toast.success("Deletando Caracteristicas")
    const res = await api.get(`/posts/filter/accounts/${idAccount}`)
    res.data.forEach(async (user) => {
     await api.delete(`/posts/${user.id}`); 
     toast.info('Deletando Posts!');
    const res = await api.get(`/comments/${user.id}`); 

    res.data.forEach(async (user) => {
        await api.delete(`/comments/${user.id}`); 
        toast.info('Deletando Comant[arios!');
       const res = await api.get(`/reply/${user.id}`); 

       res.data.forEach(async (user) => {
        await api.delete(`/reply/${user.id}`); 
        toast.info('Deletando Respostas!');
    })
    toast.info('Conta totalmente deletada!');
    })


       })

       deleteConversations(idAccount)


}

async function deleteConversations(user) {
    const idAccount = user.id
    const rmyRooms1 = await api.get(`conversations/account/filter/${idAccount}`)

     const idFriend = user.id
     const rmyRooms2 = await api.get(`conversations/friend/filter/${idFriend}`)

     const newRooms = rmyRooms1.data.concat(rmyRooms2.data);
     // console.log(newRooms);

     newRooms.forEach((room) => {
         const idRoom = room.id
         toast.success("Deletado conversas!");
              await api.delete(`/conversations/${idRoom}`);
     })
     toast.success("Deletado com sucesso!");
}

//Fim deletando conta

// Emails 

async function emailAccountRecused(email) {
    const res = await api.post("/mail/accountrecused", {mail: email})
             if(res.status === 200 || res.status === 201) {
                toast.success("Email enviado");
        }

    console.log(email)
}


async function emailAccountAproved(email) {
    const res = await api.post("/mail/accountaproved", {mail: email})
        if(res.status === 200 || res.status === 201) {
            toast.success("Email enviado");
    }
    console.log(email)
}

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
            deleteAccount1,
            deletePost,
            deleteComment,
            deleteReply,
            deleteInvite,
            deleteGroup,
            deleteEvents,
            deleteForuns,
            resendMail,
            emailAccountRecused,
            emailAccountAproved,
            updateAccount
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}