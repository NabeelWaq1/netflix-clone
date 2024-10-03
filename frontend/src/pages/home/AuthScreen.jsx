import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronRight } from 'lucide-react'


const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email) return;
        navigate(`/signup?email=${email}`);
    }
    return (
        <div className="hero-bg relative">
            {/* Nav Bar */}
            <header className="max-w-6xl w-full p-4 pb-10 flex items-center justify-between mx-auto">
                <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
                <Link to={'/signup'} className="text-white bg-red-600 rounded-md hover:bg-red-500 py-2 px-4">Sign Up</Link>
            </header>


            {/* Hero Section */}
            <div className="flex flex-col max-w-6xl justify-center items-center py-40 mx-auto text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
                <p className="text-lg mb-4">Starts at Rs 250. Cancel anytime.</p>
                <p className="mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
                <form className="flex flex-col md:flex-row gap-4 w-1/2" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email Adddress..." className="p-2 rounded flex-1 bg-black/80 border border-gray-700" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" onClick={handleSubmit} className="flex justify-center items-center px-2 lg:px-6 py-1 md:py-2 rounded bg-red-600 text-xl lg:text-2xl">Get Started <ChevronRight className="size-8 md:size-10" /></button>
                </form>
            </div>

            {/* Separator */}
            <div className="h-2 w-full bg-[#232323]" />

            {/* 1st Section */}
            <div className="py-10 bg-black text-white">
                <div className="flex justify-center items-center max-w-6xl w-full mx-auto flex-col md:flex-row px-4 md:px-2 ">
                    {/* Left Side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Enjoy on your TV</h2>
                        <p className="text-lg md:text-xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                    {/* Right Side */}
                    <div className="flex-1 relative">
                        <img src="/tv.png" alt="tv" className="mt-4 relative z-20" />
                        <video className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-10 h-1/2" muted autoPlay loop playsInline>
                            <source src="/hero-vid.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="h-2 w-full bg-[#232323]" />

            {/* 2nd Section */}
            <div className="py-10 bg-black text-white">
                <div className="flex justify-center items-center max-w-6xl w-full mx-auto flex-col-reverse md:flex-row px-4 md:px-2 ">
                    {/* Left Side */}
                    <div className="flex-1">
                        <div className="relative">
                            <img src="/stranger-things-lg.png" alt="Stranger Things Image" className="mt-4" />
                            <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 border bg-black border-slate-500 rounded-md px-2 h-24 w-3/4 lg:w-1/2">
                                <img src="/stranger-things-sm.png" alt="Stranger Things Image" className="h-full" />
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col gap-0">
                                        <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                                        <span className="text-blue-500 text-sm">Downloading...</span>
                                    </div>
                                    <img src="/download-icon.gif" alt="gif" className="h-12" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="flex-1 md:mt-4 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Download your shows to watch offline</h2>
                        <p className="text-lg md:text-xl">Save your favorites easily and always have something to watch.</p>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="h-2 w-full bg-[#232323]" />

            {/* 3rd Section */}
            <div className="py-10 bg-black text-white">
                <div className="flex justify-center items-center max-w-6xl w-full mx-auto flex-col md:flex-row px-4 md:px-2 ">
                    {/* Left Side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Watch everywhere</h2>
                        <p className="text-lg md:text-xl">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                    </div>
                    {/* Right Side */}
                    <div className="flex-1 relative overflow-hidden">
                        <img src="/device-pile.png" alt="tv" className="mt-4 relative z-20" />
                        <video className="top-2 left-1/2 -translate-x-1/2 absolute h-4/6 max-w-[63%] z-10 " muted autoPlay loop playsInline>
                            <source src="/video-devices.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="h-2 w-full bg-[#232323]" />

            {/* 4th Section */}
            <div className="py-10 bg-black text-white">
                <div className="flex justify-center items-center max-w-6xl w-full mx-auto flex-col-reverse md:flex-row px-4 md:px-2 ">
                    {/* Left Side */}
                    <div className="flex-1 relative">
                            <img src="/kids.png" alt="Kids Image" className="mt-4" />
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 md:mt-4 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Create profiles for kids</h2>
                        <p className="text-lg md:text-xl">Send kids on adventures with their favorite characters in a space made just for them — free with your membership.</p>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default AuthScreen