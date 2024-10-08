import React from 'react'
import Transaction from '../components/Transaction'

import Pagination from '../components/Pagination'

const Home = () => {
  return (
    <div className='w-full h-full'>
        <Transaction/>
        <Pagination/>
    </div>
  )
}

export default Home