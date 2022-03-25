import QuestaoModel from "../model/questao"
import styles from '../styles/Questionario.module.css'
import Botao from "./Botao"
import Questao from "./Questao"

interface Props {
  questao: QuestaoModel
  ultima: boolean
  questaoRespondida: (questao: QuestaoModel) => void
  irProxPagina(): void
}

export default function Questionario(props: Props) {

  function respostaFornecida(indice: number) {
    if (!props.questao.respondida) {
      props.questaoRespondida(props.questao.responder(indice))
    }
  }

  return (
    <div className={styles.container}>
      {
        props.questao &&
          <Questao
            valor={props.questao}
            respostaFornecida={respostaFornecida}
            tempoEsgotado={props.irProxPagina}
          />
      }

      <Botao
        texto={props.ultima ? 'Finalizar' : 'Próxima'}
        onClick={props.irProxPagina}
      />

    </div>
  )
}