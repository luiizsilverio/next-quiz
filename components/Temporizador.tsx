import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface Props {
  duracao: number
  tempoEsgotado(): void
}

export default function Temporizador(props: Props) {
  const tempo = props.duracao ? Math.floor(props.duracao / 3) : 0

  return (
    <div className={styles.container}>
      <CountdownCircleTimer
        duration={props.duracao}
        size={100}
        isPlaying
        onComplete={props.tempoEsgotado}
        colors={['#fa9b9d', '#fafa75', '#f74851']}
        colorsTime={[7, 5, 0]}
        // strokeWidth={10}
        trailColor="#aa98fa"
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  )
}