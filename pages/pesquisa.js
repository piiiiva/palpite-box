import React, { useState } from 'react'
import PageTitle from '../components/pageTitle'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Nota: 0
  })

  const notas = [0, 1, 2, 3, 4, 5]
  const [success, setSuccess] = useState(false)
  const [retorno, setRetorno] = useState({})

  const save = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form) // transforma o form em uma string
      })

      const data = await response.json()
      setSuccess(true)
      setRetorno(data)
    } catch (err) {
    }
  }

  const handleOnChange = evt => {
    const targetValue = evt.target.value // precisa colocar em "cache" antes, não da pra atribuir direto no Nome
    const key = evt.target.name

    setForm(old => ({
      ...old,
      [key]: targetValue
    }))
  }

  return (
    <div className='pt-6'>
      <PageTitle title='Pesquisa' />
      <h1 className='text-center font-bold my-4 text-2xl'>Críticas e sugestões</h1>
      <p className='text-center mb-6'>
        O restaurante x sempre busca por atender melhorseus clientes. <br />
        Por isso, estamos sempre abertos a ouvir sua opinião.
      </p>

      {!success &&
        <div className='w-1/5 mx-auto'>
          <label className='font-bold'>Seu nome:</label>
          <input
            type="text"
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='Nome'
            onChange={handleOnChange}
            name='Nome'
            value={form.Nome}
          />

          <label className='font-bold'>Seu e-mail:</label>
          <input
            type="text"
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='E-mail'
            onChange={handleOnChange}
            name='Email'
            value={form.Email}
          />

          <label className='font-bold'>Seu whatsapp:</label>
          <input
            type="text"
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='Whatsapp'
            onChange={handleOnChange}
            name='Whatsapp'
            value={form.Whatsapp}
          />

          <label className='font-bold'>Nota:</label>
          <div className='flex py-2'>
            {notas.map(nota => {
              return (
                <label className='block w-1/6 text-center'>
                  {nota} <br />
                  <input type="radio" name='Nota' value={nota} onChange={handleOnChange} />
                </label>
              )
            })
            }
          </div>

          <button
            className="mb-6 bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow"
            onClick={save}>Salvar</button>
        </div>
      }
      {success &&
        <div className='w-1/5 mx-auto'>
          <p class="mb-8 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">Obrigado por contribuir com sua sugestão ou crítica!</p>
          {
            retorno.showCoupon &&
            <div className='mb-2 text-center border p-4'>
              Seu cupom: <br />
              <span className='font-bold text-2xl'>{retorno.Cupom}</span>
            </div>
          }
          {
            retorno.showCoupon &&
            <div className='mb-8 text-center border p-4'>
              <span className='block mb-2'>{retorno.Promo}</span>
              <br />
              <span className='italic'>Tire um print ou foto dessa tela e apresente ao garçom.</span>
            </div>
          }
        </div>}
    </div>
  )
}

export default Pesquisa