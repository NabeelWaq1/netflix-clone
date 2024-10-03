import { useEffect, useState } from "react";
import { content } from "../store/content";
import axios from "axios";


const useGetTrendingContent = () => {
 const [trendingContent, setTrendingContent] = useState(null);
 const {contentType} = content();

 useEffect(()=>{
    const getTrendingCon = async () => {
    const res = await axios.get(`/api/v1/${contentType}/trending`);
    setTrendingContent(res.data.content);
    }

    getTrendingCon();
 },[contentType])

 return { trendingContent };
}

export default useGetTrendingContent