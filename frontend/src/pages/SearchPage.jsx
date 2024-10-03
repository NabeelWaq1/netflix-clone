import { useState } from "react"
import { content } from "../store/content.js";
import NavBar from "../components/NavBar.jsx";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants.js";


const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('movie');
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { setContentType } = content();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        tab === "movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
        // fetch results based on the active tab
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return toast.error("Please type something to search!");
        setResults([]);
        const fetchResults = async () => {
            try {
                const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
                setResults(response.data.content);
            } catch (error) {
                console.error(error.message);
                if(error.message.includes('404')){
                    return toast.error("Nothing found, Make sure you are searching under the right category");
                }else{
                    return toast.error("An error occurred while fetching results");
                }

            }
        };
        fetchResults();
    }

    console.log(results);
    

    return (
        <div className="min-h-screen w-full bg-black text-white ">
            <NavBar />
            <div className="container px-4 py-8 mx-auto max-w-6xl">
                <div className="flex gap-4 justify-center items-center mb-4">
                 <button onClick={() => handleTabChange('movie')} className={`text-white hover:bg-red-700 ${activeTab === "movie" ? 'bg-red-600' : 'bg-gray-500'} px-4 py-2 rounded`}>Movies</button>
                 <button onClick={() => handleTabChange('tv')} className={`text-white hover:bg-red-700 ${activeTab === "tv" ? 'bg-red-600' : 'bg-gray-500'} px-4 py-2 rounded`}>Tv Shows</button>
                 <button onClick={() => handleTabChange('person')} className={`text-white hover:bg-red-700 ${activeTab === "person" ? 'bg-red-600' : 'bg-gray-500'} px-4 py-2 rounded`}>Persons</button>
                </div>
                <form className="flex items-stretch justify-center gap-2 max-w-2xl mx-auto mt-8" onSubmit={handleSearch}>
                    <input type="text" placeholder={`Search for a ${activeTab}`} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="rounded px-4 py-2 bg-gray-800 text-white w-full" />
                    <button onClick={handleSearch} type="submit" className="bg-red-600 hover:bg-red-700 to-white p-2 py-0 rounded">
                    <Search size={26} />
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto pb-12 px-4 lg:px-0">
                {results.map((result)=>{
                    if(!result.poster_path && !result.profile_path) return null;

                    return (
                    <div className="p-4 bg-gray-500 text-white rounded-md" key={result.id}>
                        {activeTab === 'person' ? (
                            <Link to={`/actor/${result.name}`} className={'flex flex-col items-center'}>
                            <img src={(ORIGINAL_IMG_BASE_URL + result.profile_path) || (ORIGINAL_IMG_BASE_URL + result.backdrop_path)} alt={result.name} className="w-full max-h-96 object-cover rounded-md" />
                            <div className="p-2 text-center">
                                <h3 className="font-bold text-xl">{result.title || result.name}</h3>
                            </div>
                            </Link>
                        ) : (
                            <Link to={`/watch/${result.id}`} className={'flex flex-col items-center'} onClick={()=> setContentType(activeTab)}>
                            <img src={(ORIGINAL_IMG_BASE_URL + result.poster_path) || (ORIGINAL_IMG_BASE_URL + result.backdrop_path)} alt={result.title} className="w-full h-64 object-cover rounded-md" />
                            <div className="p-2 text-center">
                                <h3 className="font-bold text-xl">{result.title || result.name}</h3>
                            </div>
                            </Link>
                        )}
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchPage