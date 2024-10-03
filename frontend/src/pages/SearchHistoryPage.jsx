import { useEffect, useState } from "react";
import NavBar from '../components/NavBar.jsx'
import {SMALL_IMG_BASE_URL} from '../utils/constants.js'
import axios from "axios";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";


const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    function formatDate(dateString){

    const date = new Date(dateString);
    const monthNames = ["Jan", "Mar", "Apr", "May", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}` ;
}

    useEffect(() => {
        const getSearchHistory = async () => {
            const res = await axios.get('/api/v1/search/history');
            setSearchHistory(res.data.content);
        }

        getSearchHistory();
    }, [])

    if (searchHistory.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white">
                <NavBar />
                <h1 className="text-5xl font-bold text-center px-4 py-8">Search History</h1>
                <div className="h-96 flex justify-center items-center">
                    <p className="text-lg font-bold">No Search History Found!</p>
                </div>
            </div>
        )
    }

    const handleDelete = async (search) => {
        try {
            await axios.delete(`/api/v1/search/history/${search.id}`);
            setSearchHistory(searchHistory.filter(item => item.id !== search.id));
            toast.success("Item deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the item");
        }
    } 
    

    return (
        <div className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="px-4 py-8 max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-center">Search History</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-8">
                    {searchHistory.map((search, index) => (
                        <div key={search.id + index} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center justify-between">
                            <img src={SMALL_IMG_BASE_URL + search.image} alt="History Image" className="rounded-full size-20 object-cover mr-4" />
                            <div className="flex flex-col gap-2 items-start">
                                <span className="text-white text-lg">{search.title}</span>
                                <span className="text-gray-400 text-sm">{formatDate(search.createdAt)}</span>
                            </div>
                            </div>
                            <div className="flex items-center cursor-pointer p-2 justify-start">    
                            <span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									search.searchType === "movie"
										? "bg-red-600"
										: search.searchType === "tv"
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							> 
								{search.searchType[0].toUpperCase() + search.searchType.slice(1)}
							</span>
                            <Trash2  size={20} className="fill-red-600 hover:text-red-600 ml-4" onClick={()=> handleDelete(search)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default SearchHistoryPage;