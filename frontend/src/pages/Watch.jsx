import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { content } from '../store/content.js'
import axios from 'axios';
import NavBar from '../components/NavBar.jsx'
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants.js'

const Watch = () => {
  const { id } = useParams();
  const [trailerIdx, setTrailerIdx] = useState(0);
  const [contents, setContents] = useState({});
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [loading, setLoading] = useState(true)
  const { contentType } = content();
  const sliderRef = useRef(null);
const navigate = useNavigate();

  const formatReleaseDate = (date) => {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);

      } catch (error) {
        console.log(error.message);
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    }

    getTrailers();
  }, [contentType, id])


  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);

      } catch (error) {
        console.log(error.message);
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    }

    getSimilarContent();
  }, [contentType, id])


  useEffect(() => {
    const getContentDets = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContents(res.data.content);

      } catch (error) {
        console.log(error.message);
        if (error.message.includes("404")) {
          setContents({});
          navigate('/404')
        }
      } finally {
        setLoading(false);
      }
    }

    getContentDets();
  }, [contentType, id,navigate])

  const nextTrailer = () => {
    if (trailerIdx < trailers.length - 1) {
      setTrailerIdx(trailerIdx + 1);
    }
  }
  const prevTrailer = () => {
    if (trailerIdx > 0) {
      setTrailerIdx(trailerIdx - 1);
    }
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  }
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  }

console.log(contents);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container py-8 px-4 h-full">
        <NavBar />

        {
          loading && (
            <div className="h-screen">
              <div className="flex justify-center items-center h-full bg-black">
                <Loader className="animate-spin text-red-500 size-10" />
              </div>
            </div>
          )
        }

        <div className="flex justify-between items-center mb-4 mt-8">
          <button onClick={prevTrailer} disabled={trailerIdx === '0'} className={`flex items-center justify-center px-4 py-1  bg-gray-500/50 hover:bg-gray-500 text-white rounded ${trailerIdx === 0 ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`}><ChevronLeft size={28} /></button>
          <button onClick={nextTrailer} disabled={trailerIdx === trailers.length - 1} className={`flex items-center justify-center px-4 py-1  bg-gray-500/50 hover:bg-gray-500 text-white rounded 
          ${trailerIdx === trailers.length - 1 ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`}><ChevronRight size={28} /></button>
        </div>


        {
          trailers.length > 0 && (
            <div className="aspect-video p-2 sm:px-12 md:px-32 mb-8">
              <ReactPlayer
                url={`https://youtube.com/watch?v=${trailers[trailerIdx].key}`}
                width={'100%'}
                height={'70vh'}
                controls={true}
              />
              {
                trailers.length === 0 && (
                  <h2 className="text-center text-xl  mt-5">
                    No Trailers Available For{" "}
                    <span className="font-bold text-red-600">{content.title || content.name}</span>
                  </h2>
                )
              }
            </div>
          )
        }

        <div className="flex flex-col md:flex-row justify-between items-center gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">{contents.title || contents.name}</h2>
            <p className="mt-2 text-lg">{formatReleaseDate(contents.release_date || contents.first_air_date)} | {" "}
              {contents.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}</p>
            <p className="mt-4 text-lg">{contents?.overview}</p>
          </div>
          <img src={ORIGINAL_IMG_BASE_URL + contents.poster_path} alt="poster img" className="max-h-[600px] rounded-md" />
        </div>

        {similarContent.length > 0 &&
          <div className="p-2 max-w-6xl mx-auto relative mt-12">
            <h3 className="text-3xl font-extrabold mb-4">Similar Tv Shows/Movies</h3>

            <div className="flex space-x-8 overflow-scroll scrollbar-hide" ref={sliderRef}>
              {similarContent.map((contentItem) => {
                if(contentItem.poster_path === null) return null;
                return (
                  <Link key={contentItem.id} to={`/watch/${contentItem.id}`} className="w-52 flex-none group relative">
                  <img src={(SMALL_IMG_BASE_URL + contentItem.poster_path) || (SMALL_IMG_BASE_URL + contentItem.backdrop_path)} alt="poster img" className="w-full rounded-md" />
                  <div className="mt-2 text-white font-bod">{contentItem.title || contentItem.name}</div>
                </Link>
                )
              }
               
              
              )}


                  <button onClick={scrollLeft} className="flex justify-center items-center absolute left-0 md:left-16 top-1/2 -translate-y-1/2 rounded-full text-white bg-red-600  hover:bg-opacity-75 w-8 h-8"><ChevronLeft size={28} /></button>
         
          
                  <button onClick={scrollRight} className="flex justify-center items-center absolute right-0 md:right-16 top-1/2 -translate-y-1/2 rounded-full text-white bg-red-600  hover:bg-opacity-75 w-8 h-8"><ChevronRight size={28} /></button>
           
        
            </div>

          </div>
        }

      </div>


    </div>
  )
}

export default Watch