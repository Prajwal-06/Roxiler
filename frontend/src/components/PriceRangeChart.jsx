import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PriceRangeChart = ({ selectedMonth }) => {
    const [priceRangeData, setPriceRangeData] = useState(null);
    const priceLabels = [
        '0-100', '101-200', '201-300', '301-400', 
        '401-500', '501-600', '601-700', '701-800', 
        '801-900', '901-above'
    ];

    useEffect(() => {
        if (selectedMonth) {
            fetchPriceRangeData(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchPriceRangeData = async (month) => {
        try {
            const response = await fetch(`http://localhost:8080/api/price-range/${month}`);
            const data = await response.json();
            console.log("pricerangedata")

            setPriceRangeData(data);
        } catch (error) {
            console.error('Error fetching price range data:', error);
        }
    };

    const chartData = {
        labels: priceLabels,
        datasets: [{
            label: 'Number of Items',
            data: priceRangeData ? Object.values(priceRangeData) : [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className='w-full'>
            <h2>Price Range Distribution for {selectedMonth}</h2>
            {priceRangeData ? (
                <Bar 
                    data={chartData} 
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default PriceRangeChart;
