import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-[180px] bg-white fixed top-0 border shadow-md rounded-md'>
        <div className='flex items-center justify-center py-4 px-4'>
            <div className='text-3xl'><Link to="/">Transaction</Link></div>
        </div>
        <div className='flex py-4 px-4 gap-4'>
            <button className='text-[20px]' > <Link to="/">Home</Link> </button>
            <button className='text-[20px]' > <Link to="/statistics">Statistics</Link> </button>
            <button className='text-[20px]' > <Link to="/bar-chart">Bar Graph</Link> </button>
            <button className='text-[20px]' > <Link to="/pie-chart">Pie Chart</Link> </button>
        </div>
        </div>
  )
}

export default Navbar



