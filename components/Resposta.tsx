import RespostaModel from '../model/resposta'
import styles from '../styles/Resposta.module.css'

interface Props {
  valor: RespostaModel
  indice: number
  letra: string
  bgColor: string
  respostaFornecida(indice: number): void
}

export default function Resposta(props: Props) {
  const resposta = props.valor

  return (
    <div className={styles.resposta}
      onClick={() => props.respostaFornecida(props.indice)}
    >
      <div className={styles.conteudo}>
        {
          !resposta.revelada ? (
            <div className={styles.frente}>
              <div className={styles.letra}
                style={{backgroundColor: props.bgColor}}
              >
                {props.letra}
              </div>
              <div className={styles.valor}>
                {resposta.valor}
              </div>
            </div>
          ) : (
            <div className={styles.verso}>
              {
                resposta.certa ? (
                  <div className={styles.certa}>
                    <div>A resposta certa é...</div>
                    <div className={styles.valor}>{resposta.valor}</div>
                  </div>
                ) : (
                  <div className={styles.errada}>
                    <div>Resposta errada...</div>
                    <div className={styles.valor}>{resposta.valor}</div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}