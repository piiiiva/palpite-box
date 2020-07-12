import { GoogleSpreadsheet } from 'google-spreadsheet'
import credencials from '../../credencials.json'
import moment from 'moment'

const doc = new GoogleSpreadsheet('1bXi87Wwm-9bZLZ6z8L85FIOFMzreQYxFxG2XBK8W1GM')

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmSSSS')).toString(16).toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credencials)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1] // selecionando segunda aba da planilha
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2] // selecionando terceira aba da planilha
    await sheetConfig.loadCells('A2:B2') // selecionando células especificas da planilha

    const mostrarPromocaoCell = sheetConfig.getCell(1, 0) // linha 1 coluna 0
    const textoCell = sheetConfig.getCell(1, 1) // linha 1, coluna 1

    let Cupom = ''
    let Promo = ''

    if (mostrarPromocaoCell.value === 'VERDADEIRO') {
      // TODO:  Gerar cupom
      // Código gerado baseado na data em milessegundos, bem IMPROVÁVEL que dê problema
      Cupom = genCupom()
      Promo = textoCell.value
    }

    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Cupom,
      Promo,
      'Data Preenchimento': moment().format('DD/MM/YYYY, HH:mm:ss'),
      Nota: 5
    })
    res.end(req.body)

  } catch (err) {
    console.log(err)
    res.end('error')
  }
}