import Link from 'next/link'
import styles from '../styles/Botao.module.css'

interface Props {
  texto: string
  href?: string
  onClick?: (e: any) => void
}

export default function Botao (props: Props) {

  function renderButton() {
    return (
      <button className={styles.botao}
        onClick={props.onClick ? props.onClick : null}
      >
        {props.texto}
      </button>
    )
  }

  return (
    <>
      {
        props.href
        ? (
            <Link href={props.href} passHref>
              { renderButton() }
            </Link>
          )
        : renderButton()
      }
    </>
  )
}