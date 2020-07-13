import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import { fromBase64 } from '../../utils/base64'


const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmSSSS')).toString(16).toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    })
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
      Cupom = genCupom() // Código gerado baseado na data em milessegundos, bem IMPROVÁVEL que dê problema
      Promo = textoCell.value
    }

    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Cupom,
      Promo,
      'Data Preenchimento': moment().format('DD/MM/YYYY, HH:mm:ss'),
      Nota: parseInt(data.Nota)
    })
    res.end(JSON.stringify({
      showCoupon: Cupom !== '',
      Cupom,
      Promo
    }))

  } catch (err) {
    console.log(err)
    res.end('error')
  }
}