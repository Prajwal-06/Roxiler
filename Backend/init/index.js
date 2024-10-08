const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGO_URL); 

async function main(){
   await mongoose.connect(process.env.MONGO_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });
}

main().then(() => {
    console.log("Connected to DB");
    initDB(); 
}).catch((err) => {
    console.error("DB connection error:", err);
});

const initDB = async () => {
    await Listing.deleteMany({});  

    try {
        const data = await initData.data();  
        await Listing.insertMany(data);  
        console.log("Database initialized!!!");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};
