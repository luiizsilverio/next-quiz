import Head from 'next/head'
import { useState } from 'react'
import Botao from '../components/Botao'
import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

const questaoTeste = new QuestaoModel(1, 'Cor da capa do Batman', [
  RespostaModel.errada('Vermelha'),
  RespostaModel.certa('Preta'),
  RespostaModel.errada('Cinza'),
  RespostaModel.errada('Roxa'),
])

export default function Home() {
  const [questao, setQuestao] = useState(questaoTeste)

  function responder(indice: number) {
    setQuestao(questao.responder(indice))
  }

  function tempoEsgotado() {
    if (!questao.respondida) {
      setQuestao(questao.responder(-1))
    }
  }

  return (
    <>
      <Head>
        <title>Quiz 🏆</title>
        <meta name="description" content="Jogo de Perguntas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <Questao
          valor={questao}
          onSeleciona={responder}
          tempoEsgotado={tempoEsgotado}
        />
        <Botao texto="Próxima" />
      </div>
    </>
  )
}
