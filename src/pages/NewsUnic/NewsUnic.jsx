import { useParams } from "react-router-dom";
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch";
import "./newsUnic.css"

function NewsUnic() {
    const {id} = useParams();

    const {data} = useFetch(`/news/${id}`);


    return (
        <div className="NewsUnic">
            <Navbar />
            <div className="listNewsUnic">
                <div className={data?.[0].priority === "Normal" ? "title": data?.[0].priority === "Alta" ? "title2" : "title3"} >
            <h3>{data?.[0].title}</h3>
            <h5><b>Para:</b> Todos. <b>Prioridade:</b>{data?.[0].priority}</h5>     
                </div>
            <br />
            <h5>{data?.[0].text}</h5>  
            <br />
            <h5>Atenciosamente, <br />Equipe FOURSOME</h5>   

            <div className="reply">
                <textarea name="" id="" cols="30" rows="5" placeholder="Digite sua resposta">

                </textarea>
                <button>Responder</button>
            </div>

            </div>

        </div>
    )
}

export { NewsUnic }