import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setfavouriteData } from "../store/slices/newsSlice";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';

const NewsView = () => {
  const [favourite, setfavourite] = useState(false)
  const location = useLocation();
  const { newsData, favouriteData } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const searchid = searchParams.get('news');
  const searchString = searchid ? searchid.split("---")[0].replace(/-/g, " ") : "";

  const searchArticles = (articles, searchString) => {
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  let mergeData = [...newsData,...favouriteData]

  let data = searchString && newsData && searchArticles(mergeData, searchString)[0] || searchArticles(favouriteData, searchString)[0]
  // console.log(favouriteData,data)

  const favouriteSetter = () => {
    if (!favourite) {
      dispatch(setfavouriteData({ operation: "append", datas: data }))
      setfavourite(!favourite)
      toast.success("added to favourite")
    } else {
      dispatch(setfavouriteData({ operation: "delete", datas: data }))
      setfavourite(!favourite)
      toast.success("removed from favourites")
    }
  }

  useEffect(() => {
    if (favouriteData.some(item => item.title == data.title)) {
      setfavourite(true)
    }
  }, [])

  return (
    <>
      <div>
        <Navbar />
        <SideBar />
        <button onClick={() => window.history.back()} className="p-2 mx-12 my-4 text-white px-2 bg-blue-300 rounded-lg btn">
          back
        </button>
        <button onClick={favouriteSetter} className={`${favourite ? "text-white bg-yellow-500" : "text-black"} border p-2 w-40 mx-12 my-4 px-2 rounded-lg btn`}>
          {favourite ? "remove favourite" : "add favourite"}
        </button>

        {data ? <div className='p-5 flex justify-center items-center flex-col'><img className='mx-auto rounded-lg h-40' src={data.urlToImage} alt={data.title} />
          <div className="text-center font-bold text-xl my-2">
            {data.title}
          </div>
          <p className={`flex m-4 justify-center items-center text-center rounded-lg text-zinc-800`}>
            {data.description}
          </p>
          <button className="p-3 mx-12 my-4 text-white px-2 bg-blue-700 rounded-lg btn">
            <a href={data.url} target='blank'>See Full Story</a>
          </button> </div> : <div className='p-5 flex justify-center items-center flex-col'>
          <p className='text-xl font-medium p-20'>article not available</p>
        </div>}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default NewsView