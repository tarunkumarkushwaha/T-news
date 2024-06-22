import React from 'react'
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FavouriteArticles = () => {
  const navigate = useNavigate()
  const { favouriteData} = useSelector((state) => state.news);

  return (
    <>
      <Navbar />
      <div className={`flex flex-col`}>
        <button onClick={() => navigate("/")} className="p-2 h-10 w-16 mx-12 my-4 text-white px-2 bg-blue-300 rounded-lg btn">
          back
        </button>
        <section className="p-5">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {favouriteData.length >=1 ? <> {favouriteData.map((item, index) => {
              return <Card key={index} data={item} />
            })}
            </>
              :
              <div className="flex justify-center text-xl font-medium items-center w-[100vw] p-40">No Favourites added</div>
            }
          </div>
        </section>
      </div></>
  )
}

export default FavouriteArticles