import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/pageTitle'

const Contato = () => {
  return (
    <div>
      <PageTitle title='Contato' />
      <div className='mx-auto max-w-3xl items-center text-center'>
        <h1 className='font-bold text-2xl mt-8'>Contato</h1>

        <div className='mt-4'>
          <h3 className='text-xl font-medium text-gray-600'>E-mail</h3>
          <p className='mt-1 text-gray-800'>piiiiva@gmail.com</p>
        </div>
        <div className='mt-4'>
          <h3 className='text-xl font-medium text-gray-600'>Telefone</h3>
          <p className='mt-1 text-gray-800'>+55 47 99189-2410</p>
        </div>
        <div className='mt-4'>
          <h3 className='text-xl font-medium text-gray-600'>Whatsapp</h3>
          <p className='mt-1 text-gray-800'>+55 47 99189-2410</p>
        </div>

      </div>
    </div>
  )
}

export default Contato