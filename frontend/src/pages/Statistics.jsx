import React , {useState , useEffect} from 'react'

const Statistics = () => {

    const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
    const [month, setMonth] = useState(3); // March by default

    // Function to fetch statistics from the backend API
    const fetchStatistics = async (selectedMonth) => {
        try {
            const response = await fetch(`http://localhost:8080/api/statistics/${selectedMonth}`);
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    }

    useEffect(() => {
        fetchStatistics(month);
    }, [month]);

    // Function to handle month change from dropdown
    const handleMonthChange = (event) => {
        setMonth(parseInt(event.target.value));
    };
  return (
    <div className='w-11/12 max-w-[1160px] py-4 mx-[180px]  mt-36 bg-white flex flex-col justify-center items-center' >
    <div className='w-full flex justify-between items-center py-2 px-2'>
        <h1 className='font-bold text-[20px]'>Sales Statistics</h1>
        <div >
        <label htmlFor="month-select">Select Month: </label>
        <select className='border rounded-md' id="month-select" value={month} onChange={handleMonthChange}>
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
    

 
    
    <br />
    <div className='bg-white flex flex-col items-center justify-center'>
        <h3 className='text-[24px]'>{new Date(2022, month - 1).toLocaleString('default', { month: 'long' })} Statistics</h3>
        <br />
        <p className='text-[20px]'><strong>Total Sale:</strong> ${stats.totalSale.toFixed(2)}</p>
        <p className='text-[20px]'><strong>Total Sold Items:</strong> {stats.totalSoldItems}</p>
        <p className='text-[20px]'><strong>Total Not Sold Items:</strong> {stats.totalNotSoldItems}</p>
    </div>
    </div>
  )
}

export default Statistics