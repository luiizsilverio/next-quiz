import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
  const idSel = +req.query.id

  const questao = questoes.filter(questao => questao.id === idSel )

  if (questao.length > 0) {
    const qsel = questao[0].embaralharRespostas()
    res.status(200).json(qsel.paraObjeto())
  } else {
    res.status(204).send()  // 204 = No Content
  }
}