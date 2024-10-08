import React , {useContext , useEffect, useState} from 'react'
import { AppContext } from '../context/appContext'
import Spinner from './Spinner';
const Transaction = () => {
    const { pageData, loading , allData , setData , setPageData , page , setPage} = useContext(AppContext);

    const [input,setInput] = useState("")

    // Log pageData whenever it changes
   
    const searchHandler = async(event)=>{
        event.preventDefault();
        const searchData = await allData.filter((item)=>{
            return item.title.toLowerCase().includes(input.toLowerCase())
        })
        console.log(searchData)
        setPageData(searchData)
    }

    function inputHandler(event){
        setInput(event.target.value)
        if(event.target.value === ''){
            setPage(page)
        }
    }

  return (

    <div className='mb-20 mt-28'>
       
        <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-2 mx-auto' >
        <form className='flex gap-5' onSubmit={searchHandler}>
        <input className='bg-slate-300 border rounded-lg text-black text-center ' onChange={inputHandler} value={input} type="text" placeholder='Search Transaction' />
        <button type='submit'> Search </button>
        </form>

        </div>
    
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-2 mx-auto'>
        <table className='border w-full max-w-[1160px] py-2 mx-auto'>
        <thead className='bg-slate-700'>
        <tr className='border h-20 text-center'>
                <th className='w-8 text text-white'>Id</th>
                <th className='w-16 text text-white'>Image</th>
                <th className='w-25 text text-white'>Title</th>
                <th className='w-50 text text-white'>Description</th>
                <th className='w-25 text text-white'>Category</th>
                <th className='w-16 text text-white'>Date of sale</th>
                <th className='w-12 text text-white'>Sold</th>
                <th className='w-8 text  text-white'>Price</th>
        </tr>
        </thead>

        {
    loading? (
        <div className='h-full w-screen flex items-center justify-center'>
            <Spinner/>
            </div>
        
    ) : (
      pageData.length === 0 ? (
        <p>No Transaction available</p>
      ) : (
        pageData.filter((item)=>{
            return item.title.toLowerCase().includes(input.toLowerCase())
        })
        .map( (pageData , id)=> (
        <tbody className='bg-slate-400'>
        <tr className='border h-30' >
            <td className='p-2'>{pageData.id}</td>
            <td>
                <img src={pageData.image} alt="" className='h-12 w-12' />
            </td>
            <td className='p-2'>{pageData.title}</td>
            <td className='p-2'>{pageData.description}</td>
            <td className='p-2'>{pageData.category}</td>
            <td className='p-2'>{pageData.dateOfSale.slice(0,10)}</td>
            <td className='p-2'>{
                    pageData.sold ? <div>Sold</div> : <div>Unsold</div>
                }
                </td>
            <td className='p-2 text-green-700'> ${pageData.price.toFixed(2) }</td>
        </tr>
        </tbody>
        ) )
      )
    )
    
  }
        </table>
    </div>

    </div>
  )
}

export default Transaction


