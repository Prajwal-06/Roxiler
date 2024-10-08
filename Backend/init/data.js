const { default: axios } = require("axios");

async function get_data() {
    const transaction_data = await axios("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const data = transaction_data.data;
    return data;
}

module.exports= {data: get_data};
