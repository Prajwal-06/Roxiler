import { useState } from 'react'
import Navbar from './components/Navbar'
import Statistics from './pages/Statistics'
import Home from './pages/Home'
import BarGraph from './pages/BarGraph'
import PieChart from './pages/PieChart'
import AppContextProvider from './context/appContext'; 
import { NavLink , Route , Routes } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-full flex flex-col bg-white'>
      <AppContextProvider>
        <Navbar/>

        <Routes>
          <Route path='/' element= { <Home/> } />
          <Route path='/Statistics' element={ <Statistics/> } />
          <Route path='/pie-chart' element={ <PieChart/> } />
          <Route path='/bar-chart' element={ <BarGraph/> } />
      
        </Routes>
    
      </AppContextProvider>
    </div>
  )
}

export default App
