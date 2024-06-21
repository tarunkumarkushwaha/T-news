import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setSidebar } from "../store/slices/newsSlice";

const Navbar = () => {
    const { sidebar } = useSelector((state) => state.news);
    const dispatch = useDispatch();

    let navigate = useNavigate()

    const toggleNav = function () {
        dispatch(setSidebar(!sidebar))
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
            <header className='bg-slate-700 h-20 px-10 flex flex-row justify-between items-center'>
                <div className="flex justify-center items-center">
                    <div onClick={toggleNav} className="p-3 cursor-pointer text-white"><MenuIcon /></div>
                    <div onClick={() => navigate('/')} className="flex justify-center items-center cursor-pointer">
                        <img className='h-16 w-10 ml-10 rounded-xl' src={Logo} alt="T-news" />
                        <p className='text-white text-lg italic p-2'>T-news</p>
                    </div>
                </div>
                <div className="shadow-xl w-full max-w-[350px] rounded-md pl-6 p-4 bg-slate-700">

                    <input
                        className='bg-slate-700 text-slate-100 outline-none'
                        onChange={querySetter}
                        type="text"
                        placeholder="Search for news..."
                    />
                </div>
                {
                    <NavLink className={'p-4 text-white'} to={"/favourite"}>Favourites</NavLink>
                }
            </header>
        </>
    )
}

export default Navbar