import "./payments.css"
import {useFetch} from "../../hooks/useFetch"
import Navbar from "../../components/Nav/Navbar";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import {IoCloseCircleOutline, IoCheckmarkCircleOutline}  from 'react-icons/io5'
import { AuthContext } from "../../contexts/Auth";
import { useContext } from "react";
function Payments(){
    const {updatePaymentStatus} = useContext(AuthContext)
    const {data} = useFetch(`/payments/all`);

    if(data) {
        console.log("data")
        console.log(data)
    }
    console.log("data")

    function handleUpdatePayment(id, text, email, idAccount) {
        console.log({id, text, email, idAccount});
        updatePaymentStatus({id, text, email, idAccount})
    }
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
                                        <DateFormat date={payment.created_at}/>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Plano</b></h5>
                                        <h5>{payment.referencePlain} - {payment.namePlain}</h5>
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
                                        <h5><b>Status</b></h5>
                                        <h5>{payment.status} Dias</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Cliente</b></h5>
                                        <h5>{payment.idAccount}</h5>
                                        <h5>{payment.email}</h5>
                                    </div>
                                    <div className="dados">
                                        <h5><b>Comprovante</b></h5>
                                        <a href={payment.linkComprovant} target="_blank">Abrir</a>
                                    </div>
                                    <div className="buttons">
                                        <button onClick={()=> handleUpdatePayment(payment.id, "aproved", payment.email, payment.idAccount)}><IoCheckmarkCircleOutline/></button>
                                        <button className="btn" onClick={()=> handleUpdatePayment(payment.id, "recused", payment.email, payment.idAccount)}><IoCloseCircleOutline/></button>
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