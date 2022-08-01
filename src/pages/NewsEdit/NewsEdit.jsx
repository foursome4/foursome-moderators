import "./newsEdit.css"
import { useState } from "react";
import Navbar from "../../components/Nav/Navbar";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { toast } from "react-toastify";
import { v4 as uuidv4} from 'uuid'
import {FiUpload } from 'react-icons/fi';
import api from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function NewsEdit() {
    const {id} = useParams();
    console.log(id)
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local);

    const {newRecado} = useContext(AuthContext)
    const [components, setComponents] = useState("Lista")

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [reply, setReply] = useState(false)
    const [destination, setDestination] = useState("")
    const [destinationName, setDestinationName] = useState("")
    const [priority, setPriority] = useState("")
    const [patron, setPatron] = useState("")

    const [search, setSearch] = useState("")

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    useEffect(() => {
        async function loadNew() {
            await api.get(`/news/${id}`).then((res) => {
                console.log(id)
                setTitle(res.data[0].title)
                setText(res.data[0].text)
                setReply(res.data[0].reply)
                setDestination(res.data[0].destination)
                setDestinationName(res.data[0].destinationName)
                setPriority(res.data[0].priority)
                setPatron(res.data[0].patron)
                setAvatarUrl(res.data[0].link)
            })

        }
        loadNew();
    }, [id])



    async function searchUser(e) {
        e.preventDefault();

        await api.get(`/accounts/filter/${search}`).then((res) => {
            console.log(search)
            setDestination(res.data[0].id)
            setPatron(res.data[0].patron)
            setDestinationName(res.data[0].username)
            console.log(res.data[0])
        })
    }

    function handleFile(e) {
        // console.log(e.target.files[0])
   
        if(e.target.files[0]){
            const image = e.target.files[0];
   
            if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                console.log(avatarUrl);
             } else {
                 console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                 setImageAvatar(null);
                 return null;
             }
         }
     }

     async function handleUploadAccount(e) {
        e.preventDefault();

        if(avatarUrl === null ) {
            handleNewNews("")
            return;
        }

       toast.info("Salvando as informações. Aguarde...")
                //Avatar
        const uuid = uuidv4();
  
        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);
    
        handleNewNews(photoUrlAvatar)
  
    }
  

    function handleNewNews(media) {
        console.log({
            title,
            text,
            reply,
            destination: destination === "" ? "All" : destination,
            priority,
            patron: patron !== "" && priority === "Alta" ? patron : "",
            idAccount: user.id,
            link: media,
            type: media === "" ? "new-text" : "new-photo"
        })

        newRecado({
            title,
            text,
            reply,
            destination: destination === "" ? "All" : destination,
            priority,
            patron: patron !== "" && priority === "Alta" ? patron : "",
            idAccount: user.id,
            link: media,
            type: media === "" ? "new-text" : "new-photo"})
    }
    
    function handleSelectPriority(e) {
        setPriority(e.target.value)
        console.log(e.target.value)
      }

      function handleSelectReply(e) {
        setReply(e.target.value)
        console.log(e.target.value)
      }

      function hadleOpenRecado(id) {
        window.open(`/recados/${id}`, "_self");
    }

    return (
        <div className="News">
            <Navbar />

            <div className="components">

                <div className="Recado">
                    <h3>Novo Recado</h3>

                    <div className="form">
                        <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" placeholder="Buscar Usuário pelo id" value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <button onClick={searchUser}>Buscar usuário</button>
                        <input type="text" placeholder="Id Usuário" value={destination} onChange={(e) => setDestination(e.target.value)}/>
                        <input type="text" placeholder="Nome de Usuário" value={destinationName} onChange={(e) => setDestinationName(e.target.value)}/>
                        <input type="text" placeholder="Patrono do Usuário" value={patron} onChange={(e) => setPatron(e.target.value)}/>
                        <select name="" id="" value={priority} onChange={handleSelectPriority}>
                            <option value="">Prioridade</option>
                            <option value="Baixa">Baixa</option>
                            <option value="Jormal">Normal</option>
                            <option value="Alta">Alta</option>
                        </select>
                        <select name="" id="" value={reply} onChange={handleSelectReply}>
                            <option value="">Aceita resposta?</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                        <textarea name="" id="" cols="30" rows="10" value={text} onChange={(e) => setText(e.target.value)}></textarea>


                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>

                            <button className="btn" onClick={handleUploadAccount}>Enviar</button>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export {NewsEdit}