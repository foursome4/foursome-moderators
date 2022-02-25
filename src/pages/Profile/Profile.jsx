import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import coverImg from '../../assets/images/cover.png'
import avatar from '../../assets/images/avatar.png'
import {FiHome, FiImage, FiVideo,  FiSettings, FiMoreVertical, FiUser, FiMessageSquare, FiHeart} from 'react-icons/fi'
import './profile.css'
import { Post } from '../../components/Post/Post'
import { Photos } from '../../components/Photos/Photos'
import { Video } from '../../components/Video/Video'
import { SettingsUser } from '../../components/SettingsUser/SettingsUser'
import { ListFriends } from '../../components/ListFriends/ListFriends'
import { FaMars, FaVenus } from 'react-icons/fa'
import {useEffect, useState } from 'react'
import api from '../../services/api'
import { FeedPostIndividual } from '../../components/FeedPostIndividual/FeedPostIndividual'
import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ListFriendsPending } from '../../components/ListFriendsPending/ListFriendsPending'
import { ListFollowing } from '../../components/ListFollowing/ListFollowing'
import { ListFollowers } from '../../components/ListFollowers/ListFollowers'
import { Link } from 'react-router-dom'


function Profile() {
  const [dataUser, setDataUser] = useState(null)
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local);
  const LocalInformations = localStorage.getItem("informations-foursome");
  const userInformations = JSON.parse(LocalInformations);

  const [characteristics, setCharacteristics] = useState([])
  const [posts, setPosts] = useState([]);

  const [feed, setFeed] = useState("feed");
  const [friend, setFriend] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [group, setGroup] = useState("");
  const [forum, setForum] = useState("");
  const [setting, setSetting] = useState("");
  const [myFriends, setMyFriends] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [patron, setPatron] = useState([]);
  const [friends, setFriends] = useState("friends");
  const [following, setFollowing] = useState("following");
  const [followers, setFollowers] = useState("");
  const [requests, setRequests] = useState("");


    useEffect(() => {
      const idUser = user.id;
      async function loadInformations() {
        await api.get(`/informations/${idUser}`)
    .then((res) => {
        setDataUser(res.data[0])
    }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })
      }

      async function loadCharacteristcs() {
        const idAccount = user.id
        await api.get(`characteristics/${idAccount}`)
        .then((res) => {
          setCharacteristics(res.data)
        }).catch(error => {
          console.log("Erro ao buscar dados" + error)
      })
      }

      async function loadPosts() {
          const res = await api.get(`/posts/filter/accounts/${user.id}`);
          const dataPosts = (res.data)
          setPosts(dataPosts)
      }

      async function loadFriends() {
        const idAccount = user.id;
        const result = await api.get(`/friends/${idAccount}`);
        setMyFriends(result.data)
      }

      async function loadFollowers() {
        const idAccount = user.id;
        const result = await api.get(`/followers/filter/${idAccount}`);
          setMyFollowers(result.data)
      }


      async function searchPatron() {
        const id = user.patron;
        const patron = await api.get(`accounts/filter/${id}`);
        setPatron(patron.data[0])
      }

      loadInformations();
      loadCharacteristcs();
      loadPosts();
      searchPatron();
      loadFriends();
      loadFollowers();
    }, []);

     function handleFeed() {
        setFeed("feed")
        setFriend("")
        setPhoto("")
        setVideo("")
        setGroup("")
        setForum("")
        setSetting("")
    }
    function handleFriend() {
      setFeed("")
      setFriend("friend")
      setPhoto("")
      setVideo("")
      setGroup("")
      setForum("")
      setSetting("")
    }
    function handlePhoto() {
      setFeed("")
      setFriend("")
      setPhoto("photo")
      setVideo("")
      setGroup("")
      setForum("")
      setSetting("")
    }
    function handleVideo() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("video")
      setGroup("")
      setForum("")
      setSetting("")
    }
    function handleForum() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("")
      setGroup("")
      setForum("forum")
      setSetting("")
    }
    function handleGroup() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("")
      setGroup("group")
      setForum("")
      setSetting("")
    }
    function handleSetting() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("")
      setGroup("")
      setForum("")
      setSetting("setting")
    }


    function handleFriends() {
      setFriends("friends");
      setRequests("");
    }
    function handleFollowing() {

      setFollowing("following");
      setFollowers("");

    }
    function handleFollowers() {
      setFollowing("");
      setFollowers("followers");
    }
    function handleRequest() {
      setFriends("");
        setRequests("requests");
    }

    const photos = posts.filter(post => (post.type === "post-photo"));
    const allPhotos = photos.slice(0, 6)
    const videos = posts.filter(post => (post.type === "post-video"));

    const friendAproveds = myFriends.filter(friend => (friend.status === 'aproved'))

    const friendPending = myFriends.filter(friend => (friend.status === 'pending' && friend.idFriend === user.id))
    
    const followersMy = myFollowers.filter(friend => (friend.idFriend === user.id))
    const followingMy = myFollowers.filter(friend => (friend.idAccount === user.id))


 

    

  return (
      <div className="container">
    <div className="content-profile">
      <ToolbarLeftSlim />
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
          <div className="mark">
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                         </div>
              <img src={ userInformations !== null ? userInformations.cover : coverImg} alt="" />
          </div>
            <div className="profile-tools">
                <div className="user">
                 <div className="user-img">
                 <div className="mark">
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                                             <h5 className='white'>{user.id}</h5>
                                             <h5 className='black'>{user.id}</h5>
                

                                         </div>
                   <img src={userInformations !== null ? userInformations.avatar : avatar} alt="" />
                   </div>
                  <h3> <b>{userInformations !== null ? userInformations.nickname :"User Test"}</b></h3>
                </div>
                <div className="tools">
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed}><FiHome size={16}/> Home</button>
                  <button className={friend === "" ? "" : "select"} onClick={handleFriend}><FiUser size={16}/> Amigos</button>
                  <button className={forum === "" ? "" : "select"} onClick={handleForum}><FiHeart size={16}/> Seguir</button>
                  <button className={photo === "" ? "" : "select"} onClick={handlePhoto}><FiImage size={16}/> Fotos</button>
                  <button className={video === "" ? "" : "select"} onClick={handleVideo}><FiVideo size={16}/> Vídeos</button>
                  <button className={group === "" ? "" : "select"} onClick={handleGroup}><FiMessageSquare size={16}/> Chat</button>
                  <button className={setting === "" ? "" : "select"} onClick={handleSetting}><FiSettings size={16}/> Opções</button>
                  <button  className='settings'><FiMoreVertical size={16}/></button>
                </div>
            </div>
          <div className="sections">
              <div className="infos">
                    <div className="info">
                    <div className="name">
                        <h5>@{user !== null ? user.username :"User Test"}</h5>
                        <h6> {user !== null ? user.role : "Função não encontrada"} / {user !== null ? user.type : "Tipo de conta não encontrada"}</h6>
                    </div>
                    <div className="name">
                     
                        <br />
                        <h4>Patrono: {patron !== null ?  <Link to={`/profile-friend/${patron.id}`}>{patron.username}</Link> :"Patrono não eocnotrado"}</h4>
                        <br />
                    </div>
                {characteristics.map((characteristicsUser) => {

                  const nascimento = new Date(characteristicsUser.birthDate);
                  const hoje = new Date()
                  
                  const idade =  Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);

                  return (
                    <div className={characteristicsUser.sex === "Mulher" ? "info-user-woman" : "info-user-man"}>
                      <h4>{characteristicsUser.sex === "Mulher" ? <FaVenus size={20} /> : <FaMars size={20} />} </h4>
                        <div className="info-user-data">
                            <h5>Idade</h5>
                            <p>{idade}</p>
                        </div>
                        <div className="info-user-data">
                            <h5>Signo</h5>
                            <p>{characteristicsUser.sign}</p>
                        </div>
                        <div className="info-user-data">
                            <h5>Opção</h5>
                            <p>{characteristicsUser.sexualOption}</p>
                        </div>
                    </div>
                        )
                      })}
                  
                    <div className="info-social">
                        <div className="info-social-data">
                            <p>{friendAproveds.length}</p>
                            <h5>Amigos</h5>
                        </div>
                        <div className="info-social-data">
                            <p>{photos.length}</p>
                            <h5>Fotos</h5>
                        </div>
                        <div className="info-social-data">
                            <p>{videos.length}</p>
                            <h5>Vídeos</h5>
                        </div>
                    </div>
                </div>
            

            <div className="photos">
              <button>Fotos</button>
              <div className="images">
                {allPhotos.map((photos) => {
                  return (
                    <div className="photos-list">
                <img src={photos.link} alt="" />
                    </div>
                  )
                })}
 
               
              </div>
            </div>
            <div className="photos">
              <button>Vídeos</button>
              <div className="images">
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
                <img src={avatar} alt="" />
              </div>
            </div>
              </div>
                     <div className="feed">
                  {feed === "feed" ?
                  <>
                    <Post user={dataUser}/>
                    <br /><br />
                    <FeedPostIndividual idAccount={user.id} />
                  </>
                  :
                  friend === "friend" ?
                  <div className="friends">
                  <div className="buttonsFriends">
                    <button className={friends === "" ? "" : "select"} onClick={handleFriends}>Amigos</button>
                    <button className={requests === "" ? "" : "select"} onClick={handleRequest}>Solicitações</button>
                  </div> 


                  <div className="listFriendsMap">
                  {friends === "friends" ?
                  friendAproveds.map((friends) => {
                    return (
                      <ListFriends id={friends.idFriend === user.id ? friends.idAccount : friends.idFriend} idRegister={friends.id}/>
                      )
                    })
                    : requests === "requests" ?
                    friendPending.map((friends) => {
                      return (
                        <>
                      <ListFriendsPending idAccount={friends.idAccount} id={friends.id} />
                      </>
                    )
                  })
                  :
                  "Nada para mostrar"
                  
                }
                </div>

                  
                </div>
                  :
                  photo === "photo" ?
                  <Photos idAccount={user.id} type={"post-photo"} />
                  :
                  video === "video" ?
                   <Video idAccount={user.id} type={"post-video"} />
                   :
                   group === "group" ?
                   "Nenhum grupo aqui"
                   :
                   forum === "forum" ?

                   <div className="friends">
                   <div className="buttonsFriends">
                     <button className={followers === "" ? "" : "select"} onClick={handleFollowers}>Seguidores</button>
                     <button className={following === "" ? "" : "select"} onClick={handleFollowing}>Seguindo</button>
                   </div> 
 
                   <div className="listFriendsMap">
                   {followers === "followers" ?
                    
                      followersMy.map((followers) => {
                        return (
                          <ListFollowers id={followers.idFriend === user.id ? followers.idAccount : followers.idFriend} />
            
                        )
                      })
                    
                   :following === "following" ?
                   followingMy.map((following) => {
                    return (
                      <ListFollowing idAccount={following.idAccou === user.id ? following.idAccount : following.idFriend} idRegister={following.id}/>
                    )
                  })
                    : 
                   "Nada para mostrar"
                   
                 }
 </div>
                   
                 </div>
                  
                   :
                   setting === "setting" ?
                   "As configurações vão aparecer aqui!"
                  //  <SettingsUser idAccount={user.id} />
                  :
                  ""
                  } 
                    </div>
            </div>
         </div>
         <ChatSlim /> 
        </div>
      </div>
    </div>
    </div>
  )
}

export { Profile }