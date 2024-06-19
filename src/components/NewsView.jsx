import React from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import { useNavigate,useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../MyContext';

const NewsView = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { newsData } = useContext(Context);

  const searchParams = new URLSearchParams(location.search);
  const searchid = searchParams.get('news');
  const searchString = searchid ? searchid.split("---")[0].replace(/-/g, " ") : "";

  const searchArticles = (articles, searchString) => {
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  let data = searchString && newsData && searchArticles(newsData, searchString)[0]
  // console.log(data)
  

  return (
    <>
      <div>
        <Navbar />
        <SideBar />
        <button onClick={() => navigate("/")} className="p-2 mx-12 my-4 text-white px-2 bg-blue-300 rounded-lg btn">
          back
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