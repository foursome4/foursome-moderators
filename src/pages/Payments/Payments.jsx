import "./payments.css"
import {useFetch} from "../../hooks/useFetch"
import Navbar from "../../components/Nav/Navbar";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import {IoCloseCircleOutline, IoCheckmarkCircleOutline}  from 'react-icons/io5'
import { AuthContext } from "../../contexts/Auth";
import { useContext } from "react";
import { useState } from "react";
function Payments(){
    const {updatePaymentStatus} = useContext(AuthContext)
    const {data} = useFetch(`/payments/all`);

    const [select, setSelect] = useState("")
 
    if(data) {
        console.log("data")
        console.log(data)
    }
    console.log("data")

    function handleUpdatePayment(id, text, email, idAccount, plain) {
        console.log({id, text, email, idAccount, plain});
        updatePaymentStatus({id, text, email, idAccount, plain})
    }

    function selectStatus(status) {
        setSelect(status);
        console.log(status)
    }

    const filterPayments = data?.filter(payments => payments.status === select);
    console.log(filterPayments)

    const payments = select !== "" ? filterPayments : data
    return (
        <div className="Payments">
            <Navbar />
            <h1>Pagamentos</h1>
            
            <div className="buttonsPage">
            <button onClick={() => selectStatus("")}>Todos</button>
            <button onClick={() => selectStatus("pending")}>Pendentes</button>
            <button onClick={() => selectStatus("aproved")}>Aprovados</button>
            <button onClick={() => selectStatus("recused")}>Reprovados</button>
            </div>

            <div className="PaymentsList">

            <h2>Histórico de pagamentos</h2>
                        {payments?.map((payment) => {
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
                                        <h5>{payment.referencePlain} {payment.namePlain}</h5>
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
                                        <h5 className={payment.status === "aproved" ? "green" : payment.status === "pending" ? "yellow" : "red" }>
                                            {payment.status === "aproved" ? "Aprovado" : payment.status === "pending" ? "Pendente" : "Recusado" }
                                            </h5>
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
                                        <button onClick={()=> handleUpdatePayment(payment.id, "aproved", payment.email, payment.idAccount, payment.referencePlain)}><IoCheckmarkCircleOutline/></button>
                                        <button className="btn" onClick={()=> handleUpdatePayment(payment.id, "recused", payment.email, payment.idAccount, payment.referencePlain)}><IoCloseCircleOutline/></button>
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