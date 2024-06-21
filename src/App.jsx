import { useEffect } from "react";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import RefreshIcon from '@mui/icons-material/Refresh';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setSidebar, fetchNewsData, setIsInitialLoad } from "./store/slices/newsSlice";

function App() {
  const { newsData, query, sidebar, isInitialLoad } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialLoad || query) {
      dispatch(fetchNewsData(query));
    }
    dispatch(setIsInitialLoad(false))
  }, [query]);

  return (
    <>
      <Navbar />
      <div className={`flex flex-row justify-between transition-all duration-1000 ease-in-out`}>
        <SideBar sidebar={sidebar} setsidebar={setSidebar} setQuery={setQuery} />
        <section className="flex flex-col justify-center items-center p-1">
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
