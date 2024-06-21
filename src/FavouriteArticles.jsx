import React, { useEffect } from 'react'
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setSidebar, setfavouriteData } from "./store/slices/newsSlice";
import { useNavigate } from 'react-router-dom';

const FavouriteArticles = () => {
  const navigate = useNavigate()
  const { favouriteData, sidebar } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div className={`flex flex-row justify-between transition-all duration-1000 ease-in-out`}>
        <SideBar sidebar={sidebar} setsidebar={setSidebar} setQuery={setQuery} />
        <button onClick={() => navigate("/")} className="p-2 h-10 mx-12 my-4 text-white px-2 bg-blue-300 rounded-lg btn">
          back
        </button>
        <section className=" flex flex-col justify-center items-center p-1">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {favouriteData ? <> {favouriteData.map((item, index) => {
              return <Card key={index} data={item} />
            })}

            </>
              :
              <div className="flex justify-center items-center mx-auto"><RefreshIcon /></div>
            }
          </div>
        </section>
      </div></>
  )
}

export default FavouriteArticles