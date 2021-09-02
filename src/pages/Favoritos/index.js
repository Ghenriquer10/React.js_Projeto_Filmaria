import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';


export default function Favoritos(){
    
    const [filme, setFilme] = useState([])

    useEffect(() => {

        const filmesSalvos = localStorage.getItem('filmes' )
        setFilme(JSON.parse(filmesSalvos) || [])
    
    }, [])

    function handleFilme(id){
        let filtroFilme = filme.filter((item) => {
            return (item.id !== id)
        })

        setFilme(filtroFilme)
        localStorage.setItem('filmes',JSON.stringify(filtroFilme))
        toast.success('Filme excluido com sucesso!')

    }


    
    return(
        <div className="filmes-salvos">


            <h1>Seus Filmes Salvos</h1>

            {filme.length === 0 && <span className="ops"> <h3> Que pena! Você não possui filmes salvos :/</h3>  </span>}
            
            <ul>
                {filme.map((item) => {
                    return(
                        <li key={item.id}>
                            <h1>{item.nome}</h1> 
                            <div>
                                <Link to={`filme/${item.id}`}>Detalhes</Link>
                                <button onClick={() => handleFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}