import styles from '../styles/Estatistica.module.css'

interface Props {
  valor: number | string
  texto: string
  bgColor?: string
  color?: string
}

export default function Estatistica(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.valor} style={{
        backgroundColor: props.bgColor ?? '#FDD60F',
        color: props.color ?? '#333'
      }}>
        { props.valor }
      </div>
      <div className={styles.texto}>
        { props.texto }
      </div>
    </div>
  )
}