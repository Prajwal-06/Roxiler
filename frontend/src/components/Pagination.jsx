import React, { useContext } from 'react'
import { AppContext } from '../context/appContext';

const Pagination = () => {

  const {page , totalPages , fetchData} = useContext(AppContext);
  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 px-4 mx-[180px] bg-white fixed bottom-0 border shadow-md rounded-md'>
      <div className='w-full flex justify-between items-center  '>
        <div className='flex  gap-5 '>
          {
            page > 1 && (
            <button className='border rounded-xl py-1 px-2' onClick={()=> {fetchData(page-1)}}  >Previous</button>
            )
          }
      
          {
            page < totalPages && (
            <button className='border rounded-xl py-1 px-1' onClick={()=> {fetchData(page+1)}}>Next</button>
            )
          }

      </div>
      
        <p>
          {page} of {totalPages} Pages
        </p>
      </div>
      
    </div>
  )
}

export default Pagination