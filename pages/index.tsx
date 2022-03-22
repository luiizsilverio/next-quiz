import Head from 'next/head'
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

const BASE_URL = 'http://localhost:3000/api'

const questaoTeste = new QuestaoModel(1, 'Cor da capa do Batman', [
  RespostaModel.errada('Vermelha'),
  RespostaModel.certa('Preta'),
  RespostaModel.errada('Cinza'),
  RespostaModel.errada('Roxa'),
])

export default function Home() {
  const [idQuestoes, setIdQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>(questaoTeste)

  function responder(indice: number) {
    setQuestao(questao.responder(indice))
  }

  function tempoEsgotado() {
    if (!questao.respondida) {
      setQuestao(questao.responder(-1))
    }
  }

  function questaoRespondida(questao: QuestaoModel) {

  }

  function irProxPagina() {

  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    console.log(json)
  }


  async function carregarQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const ids = await resp.json()
    setIdQuestoes(ids)
  }


  useEffect(() => {
    carregarQuestoes()
  }, [])


  useEffect(() => {
    if (idQuestoes.length > 0) {
      carregarQuestao(idQuestoes[0])
    }
  }, [idQuestoes])


  return (
    <>
      <Head>
        <title>Quiz 🏆</title>
        <meta name="description" content="Jogo de Perguntas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Questionario
        questao={questao}
        ultima={false}
        questaoRespondida={questaoRespondida}
        irProxPagina={irProxPagina}
      />
    </>
  )
}
