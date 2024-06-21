import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsData, setIsInitialLoad } from "./store/slices/newsSlice";

function App() {
  const { newsData, query, isInitialLoad } = useSelector((state) => state.news);
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
        <section className="flex flex-col justify-center items-center p-1">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {newsData.length > 1 ? <> {newsData.map((item, index) => {
              return <Card key={index} data={item} />
            })}
            </>
              :
              <div className="flex justify-center text-xl font-medium items-center w-[100vw] p-40">Please Wait...</div>
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
