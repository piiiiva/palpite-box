import React from 'react'
import Link from 'next/link'
import useSWR from 'swr' // faz uma revalidação automática quando o usuário volta o foco na tela

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, err } = useSWR('/api/get-promo', fetcher)

    return (
        <div>
            <p className='mt-12 text-center'>
                O restaurante x sempre busca por atender melhorseus clientes.<br />
              Por isso, estamos sempre abertos a ouvir sua opinião.
            </p>
            <div className='text-center my-12'>
                <Link href='/pesquisa'>
                    <a className='bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Dar opinião ou sugestão</a>
                </Link>
            </div>
            {!data && <p>Carregando...</p>}
            {!error && data && data.showCoupon &&
                <p className='mt-12 text-center'>
                    {data.message}
                </p>
            }
        </div>
    )
}

export default Index