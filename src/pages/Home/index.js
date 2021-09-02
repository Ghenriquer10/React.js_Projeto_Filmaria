import React, { useState, useEffect } from 'react';

import api from "../../services/api"

import './home.css'

import {Link} from 'react-router-dom';

export default function Home(){

  const [filmes, setFilmes] = useState([])
  const [loadingPainel, setLoadingPainel] = useState(true)

  useEffect(() => {

    async function carregaFilmes(){
      let resposta = await api.get('r-api/?api=filmes/')

      //console.log(resposta.data)

      setFilmes(resposta.data)
      setLoadingPainel(false)
    }

    carregaFilmes()

  }, [])

    if(loadingPainel) {
        return(
          <div>
            <h1>Carregando filmes..</h1>
          </div>
        )
    }

    return(
      <div className="container">
          <div className="lista-filme">
              {filmes.map( (filme) => {
                  return(
                    <article key={filme.id}>
                        <p>{filme.nome}</p>
                        <img src={filme.foto} alt={filme.nome}/>
                        <Link className="acesso" to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                  )
              })}
          </div>
      </div>
    )
  } 