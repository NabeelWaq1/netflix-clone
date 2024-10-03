import User from "../Models/user.model.js";
import { fetchFromTMDB } from "../Services/movies.service.js";



export const searchPerson = async (req,res) => {
    try {
        const { query } = req.params;
        const userId = req.user._id;
        
        const person = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        
        if(person.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(userId,{
            $push:{
                searchHistory:{
                    id: person.results[0].id,
                    title: person.results[0].name,
                    image: person.results[0].profile_path,
                    searchType:'person',
                    createdAt: new Date(),
                },
            },
        });

        return res.status(200).json({success:true, content:person.results});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}


export const searchMovie = async (req,res) => {
 try {
        const { query } = req.params;
        const userId = req.user._id;

        const movie = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(movie.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(userId,{
            $push:{
                searchHistory:{
                    id: movie.results[0].id,
                    title: movie.results[0].title,
                    image: movie.results[0].poster_path,
                    searchType:'movie',
                    createdAt: new Date(),
                },
            },
        });

        return res.status(200).json({success:true, content:movie.results});
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}


export const searchTv = async (req,res) => {
    try {
        const { query } = req.params;
        const userId = req.user._id;

        const tv = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if(tv.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(userId,{
            $push:{
                searchHistory:{
                    id: tv.results[0].id,
                    title: (tv.results[0].name || tv.results[0].title),
                    image: tv.results[0].poster_path,
                    searchType:'tv',
                    createdAt: new Date(),
                },
            },
        });

        return res.status(200).json({success:true, content:tv.results});
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}

export const searchHistory = async (req, res) => {
    try {
        return res.status(200).json({success:true, content:req.user.searchHistory});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false, message: error.message});
    }
}

export const deleteSearchHistory = async (req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id },
            },
        });

        return res.status(200).json({success:true, message:"Item removed successfully"});
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false, message:error.message});
    }
}