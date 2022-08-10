import { useContext } from "react";
import { useState } from "react";
import Navbar from "../../components/Nav/Navbar";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import "./newPlain.css"

function NewPlain(){
    const {createNewPlain} = useContext(AuthContext)
    const [reference, setReference] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [period, setPeriod] = useState("");

    function handleNewPlain(e) {
        e.preventDefault();
        console.log(reference, name, value, period);
        createNewPlain({reference, name, value, period})
    }
    function handleSelectReference (e) {
        setReference(e.target.value);
    }


    return (
        <div className="NewPlain">
            <Navbar />
            <h1>Novo plano</h1>

            <form onSubmit={handleNewPlain}>
                <select value={reference} onChange={handleSelectReference}>
                    <option value="">Selecione o plano de referencia</option>
                    <option value="Essencial">Essencial</option>
                    <option value="Premium">Premium</option>
                </select>
                <input type="text" placeholder="Nome Plano" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Valor R$" value={value} onChange={(e) => setValue(e.target.value)}/>
                <input type="text" placeholder="Período" value={period} onChange={(e) => setPeriod(e.target.value)}/>

                <button>Cadastrar</button>
            </form>
        </div>
    )
}

export {NewPlain}