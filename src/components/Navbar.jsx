import React from 'react'
import Logo from '../assets/Logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../MyContext';

const Navbar = () => {
    const { signIn, setQuery } = useContext(Context);
    let navigate = useNavigate()
    return (
        <>
            <header className='bg-slate-700 h-20 px-10 flex flex-row justify-between items-center'>
                <div onClick={() => navigate('/')} className="flex justify-center items-center cursor-pointer">
                    <img className='h-16 w-10 ml-10 rounded-xl' src={Logo} alt="T-news" />
                    <p className='text-white text-lg italic p-2'>T-news</p>
                </div>
                <div className="shadow-xl w-full max-w-[350px] rounded-md pl-6 p-4 bg-slate-700">

                    <input
                        className='bg-slate-700 text-slate-100 outline-none'
                        onChange={(e) => setQuery("everything?q=" + e.target.value.toLowerCase())}
                        type="text"
                        placeholder="Search for news..."
                    />
                </div>
                {
                    <NavLink className={'p-4 text-white'} to={"/login"}>Login</NavLink>
                }
            </header>
        </>
    )
}

export default Navbar