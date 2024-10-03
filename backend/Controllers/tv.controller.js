import { fetchFromTMDB } from "../Services/movies.service.js";

export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomTv = data.results[Math.floor(Math.random() * data.results.length)]

        return res.status(200).json({ success: true, content: randomTv });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getTvTrailers = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        return res.status(200).json({ success: true, trailers: data.results });

    } catch (error) {
        if (error.message.includes(404)) {
            return res.status(404).send(null);
        }
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getTvDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes(404)) {
            return res.status(404).send(null);
        }
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getSimilarTvs = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({ success: true, similar: data.results });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const getTvsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        if (error.message.includes(404)) {
            return res.status(404).send(null);
        }
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}
