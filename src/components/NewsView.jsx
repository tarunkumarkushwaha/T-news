import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import { useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setfavouriteData } from "../store/slices/newsSlice";

const NewsView = () => {
  const [favourite, setfavourite] = useState(false)
  const navigate = useNavigate()
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

  let data = searchString && newsData && searchArticles(newsData, searchString)[0]
  // console.log(data,favouriteData)

  const favouriteSetter = () => {
    if (!favourite) {
      dispatch(setfavouriteData({ operation: "append", datas: data }))
      setfavourite(!favourite)
    } else {
      dispatch(setfavouriteData({ operation: "delete", datas: data }))
      setfavourite(!favourite)
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
    </>
  )
}

export default NewsView