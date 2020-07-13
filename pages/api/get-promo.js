import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = value => {
  const buff = Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

export default async (req, res) => {
  console.log(fromBase64(process.env.SHEET_PRIVATE_KEY))
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2] // selecionando terceira aba da planilha
    await sheet.loadCells('A2:B2') // selecionando células especificas da planilha

    const mostrarPromocaoCell = sheet.getCell(1, 0) // linha 1 coluna 0
    const textoCell = sheet.getCell(1, 1) // linha 1, coluna 1

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value
    }))

  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))

  }

}