import React, {useState} from 'react'
import PriceRangeChart from '../components/PriceRangeChart';

const BarGraph = () => {
  const [selectedMonth, setSelectedMonth] = useState(3);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div className='w-11/12 max-w-[1160px] py-4 mx-[180px]  mt-36 bg-white'>
            <div className='flex justify-between items-center py-2 px-2'>
             
            <h1 className='font-bold text-[20px]'>Transaction Statistics</h1>
            <div>
            <label htmlFor="month">Select Month: </label>
            <select className='border' id="month" value={selectedMonth} onChange={handleMonthChange}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            </div>
            
            </div>
            

            <PriceRangeChart selectedMonth={selectedMonth} />
        </div>
    );
};


export default BarGraph