import React, { useState } from 'react'
import Link from 'next/link'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: ''
  })

  const save = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form) // transforma o form em uma string
      })

      const data = await response.json()
      console.log(data)
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
      <h1 className='text-center font-bold my-4 text-2xl'>Críticas e sugestões</h1>
      <p className='text-center mb-6'>
        O restaurante x sempre busca por atender melhorseus clientes. <br />
        Por isso, estamos sempre abertos a ouvir sua opinião.
      </p>
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

        <button
          className="bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow"
          onClick={save}>Salvar</button>
        <pre>
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Pesquisa