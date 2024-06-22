import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { setQuery } from "../store/slices/newsSlice";
import SideBar from './SideBar';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)
    const dispatch = useDispatch();

    let navigate = useNavigate()

    const toggleNav = function () {
        setSidebar(!sidebar)
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };

    const querySetter = (e) => {
        let value = e.target.value.toLowerCase()
        if (value !== "") {      
            debounce(dispatch(setQuery("everything?q=" + value)),500)
        }
    }
    return (
        <>
            <header className='bg-slate-700 h-20 md:px-10 px-5 flex flex-row justify-between items-center'>
                <div className="flex justify-center items-center">
                    <div onClick={toggleNav} className="p-1 md:p-3 cursor-pointer text-white"><MenuIcon /></div>
                    <div onClick={() => {navigate('/'); dispatch(setQuery("top-headlines?country=in"));}} className="flex justify-center items-center cursor-pointer">
                        <img className='sm:h-16 h-8 sm:w-10 w-5 ml-7 md:ml-10 rounded-xl' src={Logo} alt="T-news" />
                        <p className='text-white sm:text-lg text-sm italic p-2'>T-news</p>
                    </div>
                </div>
                <div className="shadow-xl md:block hidden w-full max-w-[350px] rounded-md pl-6 p-4 bg-slate-700">

                    <input
                        className='bg-slate-700 text-slate-100 outline-none'
                        onChange={querySetter}
                        type="text"
                        placeholder="Search for news..."
                    />
                </div>
                {
                    <NavLink className={'p-1 sm:text-lg italic text-sm text-white'} to={"/favourite"}>Favourites</NavLink>
                }
            </header>
            <SideBar sidebar={sidebar} querySetter={querySetter} toggleNav={toggleNav} setQuery={setQuery} />
        </>
    )
}

export default Navbar