import { useRouter } from "next/router"
import Botao from "../components/Botao"
import Estatistica from "../components/Estatistica"
import styles from '../styles/Resultado.module.css'

export default function Resultado() {
  const router = useRouter()

  const total = +router.query.total
  const certas = +router.query.certas
  const percentual = Math.round((certas / total) * 100)

  return (
    <div className={styles.container}>
      <h1>Resultado Final</h1>
      <div>
        <Estatistica texto="Perguntas" valor={ total } />
        <Estatistica texto="Certas" valor={ certas } bgColor="#9CD2A4" />
        <Estatistica texto="Percentual" valor={`${percentual}%`} bgColor="#DE6A33" />
      </div>
      <Botao href="/" texto="Jogar Novamente" />
    </div>
  )
}