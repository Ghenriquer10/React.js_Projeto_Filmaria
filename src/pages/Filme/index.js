import './filme.css'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { toast } from 'react-toastify'


export default function Filme(){
    
    const { id } = useParams()
    const [filme, setFilme] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    
    useEffect(() => {
        
        async function carregaFilme(){
            const resposta = await api.get(`r-api/?api=filmes/${id}`)
            
            if(resposta.data.length === 0){
                history.replace('/')
                return;
            }

            setFilme(resposta.data)
            setLoading(false)
        }
    
        carregaFilme()
    
    }, [id, history])

    function salvaFilme(){
        // Aqui vemos se o localStorage já salvou algum item 'filmes' no localStorage
        const minhaLista = localStorage.getItem('filmes')

        // Se sim, filmesSalvos recebe os filmes salvos no localStorage, se não, um array
        const filmesSalvos = JSON.parse(minhaLista) || [];

        // Aqui retornamos true ou false se já tiver algum id de filme já salvo no local storage
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        // Verificando se retornou true ou false, se sim, dado alerta de salvo 
        if(hasFilme){
            toast.warning('Você já salvou esse filme!')
            return;
        }
        
        // Se não, salvamos o filme no localStorage
        filmesSalvos.push(filme)
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')

    }
    
    
    if(loading){
        return(
            <div>
                <h1>Carregando seu filme..</h1>
            </div>
        )
    }


    return(
        <div className="container2">
            <h2 className="titulo-filme">{filme.nome}</h2>
            <img src={filme.foto} alt={filme.nome}/>
            <h3 className="titulo-sinopse">Sinopse:</h3>
            <p>{filme.sinopse}</p>
            <div className="botoes">
                <button className="save" onClick= {salvaFilme}> Salvar</button>
                <a className="trailer" target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
            </div>
        </div>
    )
}