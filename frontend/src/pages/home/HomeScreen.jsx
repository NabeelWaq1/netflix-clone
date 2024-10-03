import { Link } from "react-router-dom"
import NavBar from "../../components/NavBar.jsx"
import { Info, Play } from "lucide-react"
import useGetTrendingContent from "../../Hooks/useGetTrendingContent.jsx"
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants.js"
import { content } from "../../store/content.js"
import MovieSlider from "../../components/MovieSlider.jsx"
import { useState } from "react"



const HomeScreen = () => {
const {trendingContent} = useGetTrendingContent();
const {contentType} = content();
const [imgLoading, setImgLoading] = useState(true)

if(!trendingContent)
  return (
      <div className="h-screen relative text-white">
        <NavBar />
       <div className="w-full h-full absolute top-0 left-0 bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </div>
  )


  return (
    <>
      <div className="h-screen relative text-white">
        <NavBar />

        {imgLoading && (
           <div className="w-full h-full absolute top-0 left-0 bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
        )} 

        <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="movie img" onLoad={()=> setImgLoading(false)} className="w-full h-full object-cover absolute top-0 left-0 -z-50" />
        <div className="w-full h-full top-0 l0 -z-50 absolute bg-black/50" aria-hidden />

        <div className="w-full h-full top-0 left-0 absolute flex justify-center flex-col px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent -z-10 absolute w-full h-full top-0 left-0" aria-hidden />

          <div className="max-w-2xl">
            <h1 className="text-6xl font-extrabold mt-4 text-balance">{trendingContent?.title || trendingContent?.name}</h1>
            <p className="mt-2 text-lg">{(trendingContent?.release_date?.split('-')[0]) || (trendingContent?.first_air_date.split('-')[0])} | {trendingContent?.adult ? "18+" : "PG-13"}</p>
            <p className="text-lg mt-4">{trendingContent?.overview.length > 200 ? trendingContent?.overview.slice(0,200) + "..." : trendingContent?.overview}</p>
          </div>
          <div className="flex mt-8">
            <Link to={`watch/${trendingContent?.id}`} className="bg-white hover:bg-white/80 rounded text-black font-bold py-2 px-4 mr-4 flex items-center" ><Play className="size-6 mr-2 fill-black" />Play Now</Link>
            <Link to={`watch/${trendingContent?.id}`} className="bg-gray-600 hover:bg-gray-600/80 rounded text-white font-bold py-2 px-4 mr-4 flex items-center" ><Info className="size-6 mr-2" />More Info</Link>
          </div>

        </div>
      </div>
<div className="flex flex-col gap-10 py-10 bg-black">
      {
        contentType === 'movie' ? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />) : TV_CATEGORIES.map((category)=> <MovieSlider key={category} category={category} />)
      }
      </div>
    </>
  )
}

export default HomeScreen