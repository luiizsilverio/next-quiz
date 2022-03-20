import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
  const idSel = +req.query.id

  const questao = questoes.filter(questao => questao.id === idSel )

  if (questao.length > 0) {
    res.status(200).json(questao[0].paraObjeto())
  } else {
    res.status(204).send()  // 204 = No Content
  }
}