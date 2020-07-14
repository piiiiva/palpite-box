import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-700 p-4 mt-8 pin-b'>
      <div className='container mx-auto text-center font-bold text-white'>
        Projeto desenvolvido por:
        Rodrigo Piva / {' '}
        <a className='hover:underline' href='https://linkedin.com/in/rodrigo-piva-10772827'>Linkedin</a> / {' '}
        <a className='hover:underline' href='https://github.com/piiiiva'>Github</a>
        <div className='mt-2'>
          <img className='inline p-4' src='/logo_semana_fsm.png' />
          <img className='inline p-4' src='/logo_devpleno.png' />
        </div>
      </div>
    </div>
  )
}
export default Footer