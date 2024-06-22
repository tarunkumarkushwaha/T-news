import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsData, setIsInitialLoad } from "./store/slices/newsSlice";
import Pagination from "./components/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { newsData, query, isInitialLoad } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const itemsPerPage = 10;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

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
            {newsData.length > 1 ? <> {currentItems.map((item, index) => {
              return <Card key={index} data={item} />
            })}
            </>
              :
              <div className="flex justify-center text-xl font-medium items-center w-[100vw] p-40">Please Wait...</div>
            }
          </div>
        </section>
      </div>
      {newsData.length > 1 &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />}
    </>
  )
}

export default App
