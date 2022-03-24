import { embaralhar } from "../functions/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel {
  #id: number
  #enunciado: string
  #respostas: RespostaModel[]
  #acertou: boolean

  constructor(
    id: number,
    enunciado: string,
    respostas: RespostaModel[],
    acertou: boolean = false
  ) {
    this.#id = id
    this.#enunciado = enunciado
    this.#respostas = respostas
    this.#acertou = acertou
  }

  get id() {
    return this.#id
  }

  get enunciado() {
    return this.#enunciado
  }

  get respostas() {
    return this.#respostas
  }

  get acertou() {
    return this.#acertou
  }

  get respondida() {
    for(let resp of this.#respostas) {
      if (resp.revelada) return true
    }
    return false
  }

  responder(indice: number): QuestaoModel {
    const acertou = this.#respostas[indice]?.certa
    const respostas = this.#respostas.map((resp: RespostaModel, i) => {
      const respSelecionada = (indice === i)
      const deveRevelar = respSelecionada || resp.certa
      const newResp = new RespostaModel(resp.valor, resp.certa, true)
      return deveRevelar ? newResp : resp
    })

    return new QuestaoModel(this.#id, this.#enunciado, respostas, acertou)
  }

  embaralharRespostas(): QuestaoModel {
    let lista = embaralhar(this.#respostas)
    return new QuestaoModel(this.#id, this.#enunciado, lista, this.#acertou)
  }

  paraObjeto() {
    return {
      id: this.#id,
      enunciado: this.#enunciado,
      respondida: this.respondida,
      acertou: this.#acertou,
      respostas: this.#respostas.map(resp => resp.paraObjeto())
    }
  }

  static importaObjeto(obj: QuestaoModel): QuestaoModel {
    const respostas = obj.respostas.map(resp => RespostaModel.importaObjeto(resp))
    return new QuestaoModel(
      obj.id,
      obj.enunciado,
      obj.respostas,
      obj.acertou
    )
  }

}