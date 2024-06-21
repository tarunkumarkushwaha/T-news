import { useCallback, useEffect, useRef } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.svg'
import { useDispatch } from 'react-redux';
import { setQuery } from "../store/slices/newsSlice";

const SideBar = ({ sidebar, toggleNav, querySetter }) => {
    const dispatch = useDispatch();

    let navigate = useNavigate()

    const menuRef = useRef();

    const closeOpenMenus = useCallback(
        (e) => {
            if (
                menuRef.current &&
                sidebar &&
                !menuRef.current.contains(e.target)
            ) {
                toggleNav();
            }
        },
        [sidebar]
    );

    useEffect(() => {
        document.addEventListener("mousedown", closeOpenMenus);
    }, [closeOpenMenus]);

    return (
        <>
            <aside ref={menuRef} className={`fixed z-20 top-0 left-0 h-full transition-all duration-1000 ease-in-out ${!sidebar ? "md:w-[25vw] w-[100vw] -translate-x-full" : "md:w-[30vw] w-[100vw] -translate-x-1"}`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                    <div onClick={toggleNav} className={` cursor-pointer pl-10 w-4 text-xxl fixed top-8 right-[35px] text-gray-50`}>
                        {sidebar && <CloseIcon />}
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div className="flex justify-center items-center">
                                <img onClick={() => navigate('/')} className='h-16 w-10 ml-10 cursor-pointer rounded-xl' src={Logo} alt="T-news" />
                                <p className='text-white text-lg italic p-2'>T-news</p>
                            </div>
                        </li>
                        <li>
                            <div className="shadow-xl block md:hidden w-full max-w-[250px] rounded-md pl-6 p-4 bg-slate-700">

                                <input
                                    className='bg-slate-700 text-slate-100 outline-none'
                                    onChange={querySetter}
                                    type="text"
                                    placeholder="Search for news..."
                                />
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("top-headlines?country=in"))} className="flex items-center p-2 cursor-pointer text-gray-100 rounded-lg hover:bg-gray-700">
                                <span className="flex-1 ms-3">Headlines</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "Market stories"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">
                                <span className="flex-1 ms-3">Market stories</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "local"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">
                                <span className="flex-1 ms-3">Local news</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "new"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">
                                <span className="flex-1 ms-3">Hot topics</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "health"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">
                                <span className="flex-1 ms-3">Health</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "trending"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">
                                <span className="flex-1 ms-3">Trending</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "politics"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">

                                <span className="flex-1 ms-3 ">politics</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => dispatch(setQuery("everything?q=" + "Sports"))} className="flex items-center cursor-pointer p-2 text-gray-100 rounded-lg hover:bg-gray-700">

                                <span className="flex-1 ms-3 ">Sports</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar