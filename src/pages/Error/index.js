import './erro.css'
import { Link } from 'react-router-dom'


export default function Erro(){
    return(
        <div className="error">
            <h1>Error: 404</h1>
            <h2>Essa página não existe!</h2>
            <Link to="/">Ir para filmes</Link>
        </div>
    )
}