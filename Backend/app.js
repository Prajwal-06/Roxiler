const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const cors = require("cors")
require('dotenv').config();
const app = express();
app.use(cors()); 

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
async function main(){
   await mongoose.connect(process.env.MONGO_URL);
}


app.get('/' , async (req , res)=>{
    try {
        const allListings = await Listing.find({}); 
        res.json(allListings); 
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
})

function getDataByMonth(data, month) {
    return data.filter(item => {
        const date = new Date(item.dateOfSale);
        return date.getMonth() + 1 === month; // Month is 0-indexed, so +1 to match the input
    });
}

// API to get statistics for a specific month (ignoring year)
app.get('/api/statistics/:month', async (req, res) => {
    const { month } = req.params;
    const numericMonth = parseInt(month);
    const allListings = await Listing.find({});
    const filteredData = getDataByMonth(allListings, numericMonth);
    

    const totalSale = filteredData.reduce((sum, item) => item.sold ? sum + item.price : sum, 0);
    const totalSoldItems = filteredData.filter(item => item.sold).length;
    const totalNotSoldItems = filteredData.filter(item => !item.sold).length;

    // Send the response with the statistics
    res.json({
        totalSale,
        totalSoldItems,
        totalNotSoldItems
    });
});


app.get('/api/price-range/:month', async (req, res) => {
    const { month } = req.params;

    try {
        const monthNumber = parseInt(month); // Ensure the month is a number

        const allListings = await Listing.find({});
        const filteredData = getDataByMonth(allListings, monthNumber); // Filter data by month

        // Initialize price range counts
        const priceRanges = {
            "0-100": 0,
            "101-200": 0,
            "201-300": 0,
            "301-400": 0,
            "401-500": 0,
            "501-600": 0,
            "601-700": 0,
            "701-800": 0,
            "801-900": 0,
            "901-above": 0
        };

        // Categorize the items based on their price into the specified ranges
        filteredData.forEach(item => {
            const price = item.price;
            if (price >= 0 && price <= 100) priceRanges["0-100"]++;
            else if (price >= 101 && price <= 200) priceRanges["101-200"]++;
            else if (price >= 201 && price <= 300) priceRanges["201-300"]++;
            else if (price >= 301 && price <= 400) priceRanges["301-400"]++;
            else if (price >= 401 && price <= 500) priceRanges["401-500"]++;
            else if (price >= 501 && price <= 600) priceRanges["501-600"]++;
            else if (price >= 601 && price <= 700) priceRanges["601-700"]++;
            else if (price >= 701 && price <= 800) priceRanges["701-800"]++;
            else if (price >= 801 && price <= 900) priceRanges["801-900"]++;
            else if (price >= 901) priceRanges["901-above"]++;
        });

        res.json(priceRanges);
    } catch (error) {
        console.error("Error fetching price range data:", error);
        res.status(500).json({ error: "Error fetching price range data" });
    }
});

app.get('/api/category-count/:month', async (req, res) => {
    const { month } = req.params;
    const numericMonth = parseInt(month); // Convert month to a number

    try {
        const allListings = await Listing.find({});
        
        const filteredListings = allListings.filter(item => {
            const date = new Date(item.dateOfSale);
            return date.getMonth() + 1 === numericMonth; 
        });

        
        const categoryCounts = {};

        filteredListings.forEach(item => {
            const category = item.category; // Assuming 'category' is the field name
            if (category) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });

        // Send the response with the category counts
        res.json(categoryCounts);
    } catch (error) {
        console.error("Error fetching category count:", error);
        res.status(500).json({ error: "Error fetching category data" });
    }
});

app.listen(8080 , ()=>{
    console.log("connected to server at 8080");
})