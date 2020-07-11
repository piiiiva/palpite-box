import { GoogleSpreadsheet } from 'google-spreadsheet'
import credencials from '../../credencials.json'

const doc = new GoogleSpreadsheet('1bXi87Wwm-9bZLZ6z8L85FIOFMzreQYxFxG2XBK8W1GM')

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credencials)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1] // selecionando segunda aba da planilha
    const data = JSON.parse(req.body)

    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Cupom: 'aaa112',
      Promo: 'Promo1'
    })
    res.end(req.body)

  } catch (err) {
    console.log(err)
    res.end('error')
  }
}