import { Patrons } from "../../components/Patrons/Patrons";
import Navbar from "../../components/Nav/Navbar";
import "./patron.css"

function Patron() {
    return (
            <div className="patron">
                <Navbar />
                <h1>Lista de apadrinhados</h1>
                <Patrons />
            </div>
    )
}

export {Patron}