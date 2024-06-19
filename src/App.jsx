import { useState } from "react";
import './App.css'
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useContext } from 'react';
import { Context } from "./MyContext";
// import { ToastContainer } from "react-toastify/dist/index.js";
import { ToastContainer } from "react-toastify";

function App() {
  // const [newsdetails, setnewsdetails] = useState(false);
  const { newsData ,setQuery,sidebar, setsidebar } = useContext(Context);

  return (
    <>
        <Navbar/>
        <div className={`flex flex-row justify-between transition-all duration-1000 ease-in-out`}>
          <SideBar sidebar={sidebar} setsidebar={setsidebar} setQuery={setQuery} />
          <section className="absolute flex flex-col justify-center items-center p-1">
            <div className="flex flex-row flex-wrap justify-center items-center">
              {newsData ? <> {newsData.map((item, index) => {
                return <Card key={index} data={item} />
              })}
              <div className="flex justify-center py-10">
              <button className="p-3 text-white px-6 bg-blue-500 rounded-lg btn">
                See More
              </button>
            </div>
            </>
               :
                <div className="flex justify-center items-center mx-auto"><RefreshIcon /></div>
              }
            </div>
          </section>
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

export default App
