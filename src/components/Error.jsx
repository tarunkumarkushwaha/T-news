import { useNavigate, useRouteError } from 'react-router-dom'
import SideBar from './SideBar';
import Navbar from './Navbar';

export default function Error() {
  const navigate = useNavigate()
  const error = useRouteError()
  console.log(error);
  return <>
    <Navbar />
    <SideBar />
    <div className="flex flex-col justify-center text-2xl text-blue-600 items-center p-[20%]">
      <p className='p-10'>Something went wrong.</p>
      <button onClick={()=>navigate('/')} className="p-3 mx-12 my-4 text-white px-2 bg-blue-500 rounded-lg btn">
        Back to home page
      </button>
    </div>
  </>
}
