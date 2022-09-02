import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch";
import "./plains.css"

function Plains(){

    const {data} = useFetch(`/plains`);

    function newPlain(e) {
        e.preventDefault();

        window.open("/newplain", "_self")
    } 
    return (
        <div className="content">
        <div className="plains">
        <Navbar />
            <h1>Planos</h1>
            
            <button onClick={newPlain}>Novo Plano</button>

            <div className="plainsList">

            {data?.map((payment) => {
                            return (
                                <div className="unic" key={payment.id}>
                                        <h4>Referencia</h4>
                                        <h3>{payment.reference}</h3>
                                        <h4>Plano</h4>
                                        <h3>{payment.name}</h3>
                                        <h4>Valor</h4>
                                        <h3>R$ {payment.value}</h3>
                                        <h4>Período</h4>
                                        <h3>{payment.period} Dias</h3>

                                        <a href={`/selectplain/${payment.id}`}>Editar</a>
                                        <a href={`/selectplain/${payment.id}`}>Excluir</a>
                                </div>
                              )
                        })}

            </div>
        </div>
        </div>
    )
}

export {Plains}