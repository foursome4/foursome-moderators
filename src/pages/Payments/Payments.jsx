import "./payments.css"
import {useFetch} from "../../hooks/useFetch"
import Navbar from "../../components/Nav/Navbar";
function Payments(){

    const {data} = useFetch(`/payments/all`);

    if(data) {
        console.log("data")
        console.log(data)
    }
    console.log("data")
    return (
        <div className="Payments">
            <Navbar />
            <h1>Pagamwntos</h1>

            <button>Todos</button>
            <button>Pendentes</button>
            <button>Aprovados</button>

            <div className="PaymentsList">

            <h2>Histórico de pagamentos</h2>
                        {data?.map((payment) => {
                            return (
                                <div className="unic" key={payment.id}>
                                    <h5> <b>Id Pagamento:</b>  {payment.id}</h5>
                                    <div className="dadosList">
                                    <div className="dados">
                                        <h5><b>Data</b></h5>
                                        <h5>{payment.created_at}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Plano</b></h5>
                                        <h5>{payment.namePlain}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Valor</b></h5>
                                        <h5>R$ {payment.value}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Período</b></h5>
                                        <h5>{payment.period} Dias</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Comprovante</b></h5>
                                        <h5>{payment.data}</h5>
                                    </div>
                                    </div>
                                    <hr />
                                </div>
                                
                              )
                        })}

            </div>
        </div>
    )
}

export {Payments}