import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import api from "../../../services/api";
import "./paymentsNumbers.css"


function PaymentsNumbers() {
    const [accounts, setAccount] = useState();

    useEffect(() => {
        async function loadAccounts() {
            const result = await api.get("/accounts");
            setAccount(result.data.length);
        }

        loadAccounts()
    }, [])

    const {data} = useFetch(`/payments/all`);

    const aprovedPayments = data?.filter((payments) => payments.status === "aproved")

    const payments = aprovedPayments?.reduce(function (acumulador, objetoAtual){
        return acumulador + parseFloat(objetoAtual.value);
      }, 0);


      console.log("accounts");
      console.log(accounts);
      console.log("accounts divisor");
      const goal = (accounts / 3) * 9.90;
      const result = goal - payments
    if(data) {
        console.log(data)
    }
    return (
        <div className="PaymentsNumbers">
            <h4><b>Rendimentos </b></h4>

            <div className="text3">
                <h3>Total de pagamentos</h3>
                <h3>R$ {payments}</h3>
            </div>
            <div className="text">
                <h3>Meta do mês</h3>
                <h3>R$ {goal}</h3>
            </div>
            <div className={result < goal ? "text4" : "text3" }>
                <h3>Resultados</h3>
                <h3>{result < goal ? `- R$ ${result}` : `+ R$ ${result}` }</h3>
            </div>

            <h5>A meta é definida com 1/3 do total de contas, multiplicadas pelo valor mínimo de R$ 9,90</h5>
        </div>
    )
}

export {PaymentsNumbers}