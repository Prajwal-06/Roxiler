import { createContext, useState , useEffect } from "react";
import axios from "axios";

const url = "http://localhost:8080/";

export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const[loading , setLoading] = useState(false);
    const[allData , setData] = useState([])
    const[page , setPage]  = useState(1);
    const[pageData , setPageData] = useState([])
    const[totalPages , setTotalPages] = useState(6);

async function fetchData(page) {
    setLoading(true);
    try {
        const result = await axios(url);
        const data = result.data;
        setData(data);
        setTotalPages(6);
        setPage(page)
        const end = (page*10);
        const start = end-10;
        //need to change setPageData
        let transactions = data.slice(start , end)
        setPageData(transactions);
        setLoading(false);
        console.log(pageData)
        console.log(data);
    } catch (error) {
       console.log("Error occurs while fetching API")
       setPage(1);
       setPageData([]);
       setLoading(false); 
    }
    
}


useEffect(() => {
    fetchData(page);
}, [page]);

function pageHandler(newPage) {
    setPage(newPage); // This will trigger useEffect to fetch data for the new page
}

const value = {
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    pageData,
    setPageData,
    AppContext,
    fetchData,
    pageHandler,
    setData,
    allData,

}

return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>

}