import styles from '../styles/Enunciado.module.css'

interface Props {
  texto: string
}

export default function Enunciado(props: Props) {
  return (
    <div className={styles.enunciado}>
      <span className={styles.texto}>{ props.texto }</span>
    </div>
  )
}