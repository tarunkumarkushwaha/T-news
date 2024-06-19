
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ data }) => {

    const navigate = useNavigate()

    const fullNews = () =>{
         navigate(`/article?news=${data.title.replace(/\s/g, '-')}`)
    }

    return (
        <>
            <div onClick={fullNews} className={`relative m-2 cursor-pointer bg-zinc-300 border-zinc-400 text-zinc-900
             shadow-md hover:shadow-xl hover:scale-105 duration-500 min-h-[460px]
             w-[300px] border p-2 rounded-md flex flex-col`}>
                <img className='mx-auto rounded-lg h-40' src={data.urlToImage} alt={data.title} />
                <div className="text-center font-bold text-xl my-2">
                    {data.title}
                </div>
                <button className="absolute bottom-1 left-12 p-3 mx-12 my-4 text-white px-2 bg-blue-500 rounded-lg btn">
                    <a href={data.url} target='blank'>See Full Story</a>
                </button>
            </div>
        </>
    )
}

export default Card