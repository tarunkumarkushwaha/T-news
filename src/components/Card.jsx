import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ data }) => {

    const navigate = useNavigate()

    const fullNews = () =>{
         navigate(`/article?news=${data.title.replace(/\s/g, '-')}`)
    }

    return (
        <>
            <div onClick={fullNews} className={` m-2 cursor-pointer bg-zinc-300 border-zinc-400 text-zinc-900
             shadow-md hover:shadow-xl hover:scale-105 duration-500 sm:h-[380px] h-[290px]
             sm:w-[300px] w-[250px] border p-2 rounded-md flex flex-col`}>
                <img className='mx-auto rounded-lg sm:h-40 h-32' src={data.urlToImage} alt={data.title} />
                <div className="text-center font-bold sm:text-xl text-base my-2">
                    {data.title}
                </div>
                {/* <button className="absolute bottom-1 left-1/2 -translate-x-1/2 p-3 my-4 text-white px-2 bg-blue-500 rounded-lg btn">
                    <a href={data.url} target='blank'>See Full Story</a>
                </button> */}
            </div>
        </>
    )
}

export default Card