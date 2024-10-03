import { useEffect, useRef, useState } from "react";
import { content } from "../store/content"
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MovieSlider = ({category}) => {
     const {contentType} =content();
     const formattedContentType = contentType === "movie" ? "Movie" : "Tv Shows"
     const formattedCategory = category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1);
     const [contents, setContents] = useState(null);
     const [showArrows, setShowArrows] = useState(false)
     const sliderRef = useRef(null);


     useEffect(()=>{
        const fetchContent = async ()=>{
            const response = await axios.get(`/api/v1/${contentType}/${category}`);
            setContents(response.data.content);
        }
        fetchContent();
     },[contentType,category])

     const scrollLeft = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth'});
        }
     }
     const scrollRight = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:'smooth'});
        }
     }



  return (
  <div className="bg-black text-white px-4 md:px-10 relative"
  onMouseEnter={()=> setShowArrows(true)}
  onMouseLeave={()=> setShowArrows(false)}
  >
    <h2 className="text-2xl font-bold mb-4">{formattedCategory}{" "}{formattedContentType}</h2>

    <div className="flex space-x-4 overflow-scroll scrollbar-hide" ref={sliderRef}>
        {contents?.map((item)=>{
            return (
                <Link to={`/watch/${item?.id}`} key={item?.id} className="min-w-[250px] relative group">
    <div className="rounded-lg overflow-hidden">
                    <img src={SMALL_IMG_BASE_URL + item?.backdrop_path} alt={item.title} className="transition-transform duration-500 ease-in-out group-hover:scale-125" />
                    </div>
                    <p className="mt-2 text-center">{item?.title || item?.title}</p>
          
                </Link>
            )
        })}
        </div>  

        {
            showArrows && (
                <button onClick={scrollLeft} className="flex justify-center items-center absolute left-5 md:left-16 top-1/2 -translate-y-1/2 rounded-full text-white bg-black bg-opacity-50 hover:bg-opacity-75 size-10"><ChevronLeft size={28} /></button>
            )
        }
        {
            showArrows && (
                <button onClick={scrollRight} className="flex justify-center items-center absolute right-5 md:right-16 top-1/2 -translate-y-1/2 rounded-full text-white bg-black bg-opacity-50 hover:bg-opacity-75 size-10"><ChevronRight size={28} /></button>
            )
        }
  </div>
  )
}

export default MovieSlider