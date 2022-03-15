import { useContext, useEffect, useState } from 'react';
import { TopBar } from '../../components/TopBar/TopBar';
import api from '../../services/api';
import './dashboard.css';

function Dashboard() {
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local)

    const [accounts, setAccounts] = useState([]);
    const [usersOnline, setUsersOnline] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [Reply, setReply] = useState([]);

    useEffect(() => {
        async function loadAccounts(){
            await api.get("/accounts").then((result) =>{
                setAccounts(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        async function loadPosts(){
            await api.get("/posts/all").then((result) =>{
                setPosts(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }

        loadAccounts();
        loadPosts();
    }, [])

    const PostPhoto = posts.filter((photo) => (photo.type === "post-photo"));
    const PostVideo = posts.filter((photo) => (photo.type === "post-video"));
    const PostText = posts.filter((photo) => (photo.type === "post-text"));

    return (
        <div className="content">
            <div className="dashboard">
                <TopBar />
                <div className="mainDashboard">
                <div className="title">
                    <h3>Olá Jeferson, seja bem-vindo de volta</h3>
                </div>
                <div className="blocks">
                    <div className="block">
                        <h4>Usuários cadastrados</h4>
                        <div className="informationAccount">
                            {
                                accounts.map((account) => {
                                    return(
                                        <div className="account" key={account.id}>
                                            <div className="name">
                                            <h4>{account.id} </h4> - 
                                            <h4> {account.username}</h4>
                                            </div>
                                            <div className="buttons">
                                                <button>Bloquear</button>
                                                <button>Banir</button>
                                                <button>Promover</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                       
                    </div>
                   
                    <div className="block">
                        <h4>Fotos</h4>
                        <div className="informationPhoto">
                            {PostPhoto.map((photo) => {
                               return (
                                <div className="photos">
                                <h4>{photo.username}</h4>
                                <div className="image">
                                <img src={photo.link} alt={`Post Foto ${photo.username}`} />
                                </div>
                                <button>Deletar</button>
                            </div>
                               )
                            })}
                        </div>
                       
                    </div>
                   
                    <div className="block">
                        <h4>Vídeos</h4>
                        <div className="informationVideo">
                            {PostVideo.map((video) => {
                                return(
                                    <div className="videos">
                                         <h4>{video.username}</h4>
                                          <div className="video">
                                        <video controls controlsList="nofullscreen nodownload" >
                                             <source src={video.link} type="video/mp4"/>
                                        </video>
                                        </div>
                                         <button>Deletar</button>
                                    </div>
                                )
                            })}
                        
                        </div>
                       
                    </div>
                   
                    <div className="block">
                        <h4>Posts</h4>
                        <div className="information">
                            
                        </div>
                       
                    </div>
                 </div>

                 <div className="mini-blocks">
                     <div className="mini">
                        <h4> Contas Criadas</h4>
                        <h4> {accounts.length} </h4>
                     </div>
                     <div className="mini">
                        <h4> Fotos Postadas</h4>
                        <h4> {PostPhoto.length} </h4>
                     </div>
                     <div className="mini">
                        <h4> Videos postados</h4>
                        <h4> {PostVideo.length} </h4>
                     </div>
                     <div className="mini">
                        <h4> Grupos criados</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Foruns Criados</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Eventos Criados</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Convites Enviados</h4>
                        <h4> X </h4>
                     </div>
                     <div className="mini">
                        <h4> Usuários Online</h4>
                        <h4> X </h4>
                     </div>
                 </div>
                </div>

            </div>
        </div>
    )
}

export {Dashboard}