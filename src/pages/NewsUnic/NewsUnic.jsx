import { useParams } from "react-router-dom";
import Navbar from "../../components/Nav/Navbar";
import { ReplyNews } from "../../components/ReplyNews/ReplyNews";
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
            {data?.[0].link === "" ? "":
            <img src={data?.[0].link} alt={data?.[0].title} /> 
            }
            <br />
            <h5>Atenciosamente, <br />{data?.[0].nickname}</h5>

            <ReplyNews id={data?.[0].id} reply={data?.[0].reply}/> 


            </div>

        </div>
    )
}

export { NewsUnic }