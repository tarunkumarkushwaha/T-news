import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import Error from './components/Error.jsx'
import NewsView from './components/NewsView.jsx'
import store from './store/index.js'
import { Provider } from 'react-redux'
import FavouriteArticles from './FavouriteArticles.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: '/favourite',
    element: <FavouriteArticles/>,
    errorElement: <Error />,
  }
  ,
  {
    path: '/:article',
    element: <NewsView />,
    errorElement: <Error />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
