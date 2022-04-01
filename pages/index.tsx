import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [idQuestoes, setIdQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respCertas, setRespCertas] = useState(0)
  const router = useRouter()

  function responder(indice: number) {
    setQuestao(questao.responder(indice))
  }

  function tempoEsgotado() {
    if (!questao.respondida) {
      setQuestao(questao.responder(-1))
    }
  }

  function questaoRespondida(questao: QuestaoModel) {
    setQuestao(questao)
    if (questao.acertou) {
      setRespCertas(prev => prev + 1)
    }
  }

  function idProxPergunta() {
    if (questao) {
      const proxId = idQuestoes.indexOf(questao.id) + 1
      return idQuestoes[proxId]
    }
  }

  function irProxPagina() {
    const proxId = idProxPergunta()
    proxId ? irParaProxQuestao(proxId) : finalizar()
  }

  function irParaProxQuestao(id: number) {
    carregarQuestao(id)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idQuestoes.length,
        certas: respCertas
      }
    })
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.importaObjeto(json)
    setQuestao(novaQuestao)
  }


  async function carregarQuestionario() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const ids = await resp.json()
    setIdQuestoes(ids)
  }


  useEffect(() => {
    carregarQuestionario()
  }, [])


  useEffect(() => {
    if (idQuestoes.length > 0) {
      carregarQuestao(idQuestoes[0])
    }
  }, [idQuestoes])


  return (
    <div>
      <Head>
        <title>Quiz 🏆</title>
        <meta name="description" content="Jogo de Perguntas" />
        <link rel="icon" href="/logo.png" />
      </Head>

      {
        questao &&
          <Questionario
            questao={questao}
            ultima={idProxPergunta() === undefined}
            questaoRespondida={questaoRespondida}
            irProxPagina={irProxPagina}
          />
      }
    </div>
  )
}
