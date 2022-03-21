import Head from 'next/head'
import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

export default function Home() {
  const teste = new QuestaoModel(1, 'Cor da capa do Batman', [
    RespostaModel.errada('Vermelha'),
    RespostaModel.certa('Preta'),
    RespostaModel.errada('Cinza'),
    RespostaModel.errada('Roxa'),
  ])

  return (
    <>
      <Head>
        <title>Quiz 🏆</title>
        <meta name="description" content="Jogo de Perguntas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Questao valor={teste}/>
      </div>
    </>
  )
}
