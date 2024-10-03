import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react'
import {authUser} from '../store/authUser.js'
import { useState } from 'react';
import { content } from '../store/content.js';

const NavBar = () => {
    const {user, Logout} = authUser();
    const [toggleMenu, setToggleMenu] = useState(false)
    const {setContentType} = content();
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap justify-between items-center p-4 h-20'>
        <div className="flex gap-10 z-50 items-center">
            <Link to={'/'}>
            <img src="/netflix-logo.png" alt="Netflix  Logo" className='w-32 sm:w-40'/>
            </Link>

             {/* Desktop NavBar Items */}
        <div className="hidden sm:flex gap-4 items-center">
            <Link to={'/'} className="text-white hover:underline" onClick={()=> setContentType('movie')}>Movies</Link>
            <Link to={'/'} className="text-white hover:underline" onClick={()=> setContentType('tv')}>Tv Shows</Link>
            <Link to={'/history'} className="text-white hover:underline">Search History</Link>
        </div>

        </div>

       <div className="flex gap-2 items-center relative z-50">
        <Link to={'/search'} className='cursor-pointer'><Search size={'20'} cursor={"pointer"}/></Link>
        <img src={`/${user.image}`} alt="Avatar" className='size-8 rounded' />
        <LogOut size={'20'} onClick={Logout} cursor={'pointer'} />
        <Menu className='sm:hidden block cursor-pointer' size={'20'} onClick={()=>setToggleMenu(!toggleMenu)}/>
       </div>

       {toggleMenu && (
        <div className="w-full mt-4 sm:hidden relative z-50 bg-black rounded border border-gray-800">
            <Link to={"/"} className='block hover:underline p-2 ' onClick={()=>setToggleMenu(!toggleMenu)}>Movies</Link>
            <Link to={"/"} className='block hover:underline p-2 ' onClick={()=>setToggleMenu(!toggleMenu)}>Tv Shows</Link>
            <Link to={"/history"} className='block hover:underline p-2 ' onClick={()=>setToggleMenu(!toggleMenu)}>Search History</Link>
        </div>
       )}


    </header>
  )
}

export default NavBar