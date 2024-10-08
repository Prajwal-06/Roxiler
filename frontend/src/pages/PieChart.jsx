import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieChart = () => {
    const [selectedMonth, setSelectedMonth] = useState(3);
    const [categoryData, setCategoryData] = useState(null);
    const [priceRangeData, setPriceRangeData] = useState(null);

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];

    useEffect(() => {
        if (selectedMonth) {
            fetchCategoryData(selectedMonth);
            fetchPriceRangeData(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchCategoryData = async (month) => {
        try {
            const response = await fetch(`http://localhost:8080/api/category-count/${month}`);
            const data = await response.json();
            console.log('Fetched category data:', data); // Log the fetched data
            setCategoryData(data);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    const fetchPriceRangeData = async (month) => {
        try {
            const response = await fetch(`http://localhost:8080/api/price-range/${month}`);
            const data = await response.json();
            setPriceRangeData(data);
        } catch (error) {
            console.error('Error fetching price range data:', error);
        }
    };

    const handleMonthChange = (event) => {
        const month = parseInt(event.target.value, 10);
        setSelectedMonth(month);
    };

    // Chart Data for Price Range
    const priceLabels = [
        '0-100', '101-200', '201-300', '301-400', 
        '401-500', '501-600', '601-700', '701-800', 
        '801-900', '901-above'
    ];
    
    const priceChartData = {
        labels: priceLabels,
        datasets: [{
            label: 'Number of Items',
            data: priceRangeData ? Object.values(priceRangeData) : [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Chart Data for Category
    const pieChartData = {
        labels: categoryData ? Object.keys(categoryData) : [],
        datasets: [{
            label: 'Number of Items',
            data: categoryData ? Object.values(categoryData) : [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className='w-11/12 max-w-[1160px] py-4 mx-[180px]  mt-36 bg-white flex flex-col justify-center items-center'>
            <div className='w-full flex justify-between items-center py-2 px-2'>
            <h1 className='font-bold text-[20px]'>Data Visualization</h1>
            <div>
            <label htmlFor="selectmonth">Select Month:</label>
            <select className='border' id='selectmonth' value={selectedMonth} onChange={handleMonthChange}>
                <option value="">Select a month</option>
                {months.map((month) => (
                    <option key={month.value} value={month.value}>
                        {month.label}
                    </option>
                ))}
            </select>
            </div>
            </div>
            
            <br />

            {selectedMonth && (
                <div className='h-96 w-96'>
                    <h2>Category Distribution for {selectedMonth}</h2>
                    {categoryData ? (
                        <Pie 
                            data={pieChartData} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                            }}
                        />
                    ) : (
                        <p>Loading category data...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PieChart;
