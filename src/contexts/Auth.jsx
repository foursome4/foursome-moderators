import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../services/api';
import io from 'socket.io-client';
import { socket } from '../services/websocket';
import apiGoogleReverse from '../services/apiGoogleReverse';


const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [userDataNew, setUserDataNew] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [lat, setlat] = useState("");
    const [long, setLong] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");


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


    useEffect(() => {
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            console.log(latitude)
            setlat(latitude)
            console.log(longitude)
            setLong(longitude)

           reverseGeolocalization(latitude, longitude)
          }
        
          function error() {
            console.log('Unable to retrieve your location');
          }

        function getLocation() {
           return window.navigator.geolocation.getCurrentPosition(success, error);
            }

               async function reverseGeolocalization(lat, long) {
                  const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyAKKy0iHlEZMQavlxNM5i-tkIYp4q7X_Y0`);
                  console.log("Cidade")
                  setCity(address.data.results[0].address_components[3].long_name)
                  console.log(address.data.results[0].address_components[3].long_name)
                  console.log("UF")
                  setUf(address.data.results[0].address_components[4].short_name)
                  console.log(address.data.results[0].address_components[4].short_name)
               }


            //    function setUserOnline() {
            //     let equalCity = " "
            
            //     if(city === userDataNew.city && uf === userDataNew.uf ) {
            //         equalCity = true
            //     } else {
            //         equalCity = false
            //     }
            
            //     const data = {
            //         idAccount: user.id,
            //         username: user.username,
            //         nickname: userDataNew.nickname,
            //         avatar: userDataNew.avatar,
            //         lat: lat.toString(),
            //         long: long.toString(),
            //         equalCity: equalCity
            //     }
            
            //     console.log("data");
            //     console.log(data);
            //     console.log("User");
            //     console.log(user);
               
            //     socket.emit("userOnline", data)
            //    }


            getLocation()
            // setUserOnline()
    }, [user, userDataNew]);





    
    async function loginSession({login, password}) {     
       
        let email;
        let username;
        
        if(login.includes('@')) {
            email = login
            await api.post("/session", {email, password}).then((result) => {
                console.log(result.data)
                
                if (result.data.role !== "Membro") {
                    storageUser(result.data);
                    setLoading(false);
                    toast.info(`Seja bem vindo(a), ${result.data.username}`);
                } else {
                    toast.error(`Usuário sem permissão!`);
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
                if (result.data.role !== "Membro") {
                    storageUser(result.data);
                    setLoading(false);
                    toast.info(`Seja bem vindo(a), ${result.data.username}`);
                } else {
                    toast.error(`Usuário sem permissão!`);
                }
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login.
                E-mail, usuário ou senha incorretos!`);
            })
        }
        
    }






async function deletePost(id) {
    const res = await api.delete(`/posts/${id}`);
    if(res.status===201) {
        toast.success('post deletado com sucesso!');
     //    window.location.reload(false);
     //    window.location.reload(false);
     } else {
        toast.error('Deu algo errado ao deletar!');
     }
}

async function deleteComment(id) {
    const res = await api.delete(`/comments/${id}`);
    if(res.status===201) {
        toast.success('post deletado com sucesso!');
        // window.location.reload(false);
     } else {
        toast.error('Deu algo errado ao deletar!');
     }
}

async function likePost({idAccount, username, idPost}) {
await api.post("/reactions", {idAccount, username, idPost}).then((result) => {
    console.log(result.data)
    console.log("Post Realizado com sucesso!");
  // window.location.reload(false)
    setLoading(false)
}).catch(error => {
    console.log(error)
    toast.warning('Você já curtiu esta postagem!');
    })
}

async function newComment({idAccount, idPost, text, avatar, username, nickname}) {
    await api.post("/comments", {idAccount, idPost, text,avatar, username, nickname}).then((result) => {
        console.log(result.data)
        console.log("Comentário Realizado com sucesso!");
    }).catch(error => {
        console.log("Comentário não foi realizado" + error)
    })
}

async function CreateInviteNewUsew({code, name, email, phone,idAccount, username, patron, patronNikcname}) {
    const text = `Parabens ${name}! %0AVocê foi convidado por ${patronNikcname} a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. FOURSOME foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa. %0A%0AEsse convite é valido por 10 dias e intransferível. %0A%0APara criar seu perfil agora, acesse: %0A https://foursome.com.br/signup/${email} %0A Utilize o Código: ${code}  %0A e adicione o código do seu Patrono: ${patron} %0A%0AEm caso de dúvida, fale conosco. %0AContato@foursome.com.br %0A%0AFOURSOME https://www.foursome.com.br`
    
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data[0]) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, patron}).then((result) =>{
        console.log("Convite cadastrado com sucesso");
        window.open("https://api.whatsapp.com/send?phone=55"+ phone + "&text=" + text,
        '_blank')
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
        toast.error("Já existe um covite com este e-mail!")
    })  
}

async function findInformationsAccount(id) {
    await api.get(`/informations/${id}`)
    .then((res) => {
        console.log("Find Informations")
        const data2 = res.data[0]
        console.log(data2);
        setUserDataNew(data2)
        if(data2 !== undefined ) {
            localStorage.setItem("informations-foursome", JSON.stringify(data2));
            redirectToAfterLogin()
        } else {
            navigate("/completeregistration");
        }
    }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
}

function redirectToAfterLogin() {
    const storageUserInformation = localStorage.getItem("informations-foursome");
    if(storageUserInformation) {
        navigate("/feed");
    } 
    window.location.reload()
}

async function newFriend(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/friends", data).then((result) => {
        console.log(result.data)
        console.log("Solicitação enviada com sucesso!")
       window.location.reload(false);
    }).catch(error => {
        console.log(error)
    })

}

async function friendAproved(id) {
    console.log(id)
   await api.put(`/friends/${id}`, {status: "aproved"}).then((result) => {
       console.log("Solicitação aprovada com sucesso!")
        window.location.reload(false)
   })
}

async function deleteFriend(id){
    console.log(id);
    await api.delete(`/friends/${id}`).then((result) => {
        console.log("Amigo deletado com sucesso!")
      window.location.reload(false)
    })
}

async function deleteFollower(id){
    console.log(id);
    await api.delete(`/followers/${id}`).then((result) => {
        console.log("Amigo deletado com sucesso!")
       window.location.reload(false)
    })
}

async function deleteLike(id){
    console.log(id);
    await api.delete(`/reactions/${id}`).then((result) => {
        console.log("like deletado com sucesso!")
      // window.location.reload(false)
    })
}



async function newFollower(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/followers", data).then((result) => {
        console.log(result.data)
        console.log("Seguindo com sucesso!")
       window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })

}

async function deleteFriendAndFollower(id, idAccount, idFriend, type, status) {
    console.log(id, idAccount, idFriend, type, status)
    const data = {idAccount, idFriend, type, status}
    await api.delete(`/friends/${id}`).then( async (result) => {
        console.log("Amigo deletado com sucesso!")
        console.log(result)


        await api.post("/followers", data).then((result) => {
            console.log(result.data)
            console.log("Seguindor criado com sucesso!")
            window.location.reload(false)
        }).catch(error => {
            console.log(error)
        })


     
    }).catch(error => {
        console.log(error)
    })

}


    function storageUser(data) {
        localStorage.setItem("foursome", JSON.stringify(data));
        // console.log("Data id Account")
        // console.log(data.id)
        findInformationsAccount(data.id)
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
            user,
            loginSession,
            loading,
            logout,
            updateInformationsAccount,
            updateCharacteristcs,
            updateCharacteristcs2,
            updateCharacteristcs3,
            preferencesAccount,
            newPost,
            CreateInviteNewUsew,
            userDataNew,
            newComment,
            deletePost,
            deleteComment,
            likePost,
            newFriend,
            newFollower,
            friendAproved,
            deleteFriend,
            deleteFollower,
            deleteFriendAndFollower,
            deleteLike,
            socket
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}