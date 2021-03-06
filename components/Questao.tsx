import QuestaoModel from "../model/questao";
import styles from "../styles/Questao.module.css"
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
  { valor: 'A', cor: "#F2C866"},
  { valor: 'B', cor: "#F266BA"},
  { valor: 'C', cor: "#85D4F2"},
  { valor: 'D', cor: "#BCE596"},
]

interface QuestaoProps {
  valor: QuestaoModel
  respostaFornecida(indice: number): void
  tempoEsgotado(): void
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />

      {
        questao.respostas.map((resp, i) => (
          <Resposta
            indice={i}
            letra={letras[i].valor}
            valor={resp}
            bgColor={letras[i].cor}
            key={resp.valor}
            respostaFornecida={props.respostaFornecida}
          />
        ))
      }

      <Temporizador
        key={questao.id}
        duracao={7}
        tempoEsgotado={props.tempoEsgotado}
      />
    </div>
  )
}