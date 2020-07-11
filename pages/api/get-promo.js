import { GoogleSpreadsheet } from 'google-spreadsheet'
import credencials from '../../credencials.json'

const doc = new GoogleSpreadsheet('1bXi87Wwm-9bZLZ6z8L85FIOFMzreQYxFxG2XBK8W1GM')

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credencials)
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