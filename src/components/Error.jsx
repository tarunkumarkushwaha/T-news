import { useRouteError } from 'react-router-dom'
import SideBar from './SideBar';
import Navbar from './Navbar';

export default function Error() {
  const error = useRouteError()
  console.log(error);
  return <>
    <Navbar/>
    <SideBar/>
    <div className="flex justify-center text-2xl text-blue-600 items-center p-[20%]">Something went wrong.</div>
    </>
}
