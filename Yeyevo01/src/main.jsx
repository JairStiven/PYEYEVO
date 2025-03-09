import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartContent from './Components/CartContent/CartContent.jsx'
import Login from './Components/login/login.jsx'
import Register from './Components/registro/register.jsx'
import HomeAdmin from './Components/HomeAdmin/homeAdmin.jsx'
import Catalogo from './Components/Catalogo/catalogo.jsx'
import CatalogoUser from './Components/CatalogoUser/catalogoUser.jsx'
import App from './App.jsx'
import ContextProvider from './Context/Context.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/cart',
    element: <CartContent/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/homeAdmin',
    element: <HomeAdmin/>
  },
  {
    path: '/catalogo',
    element: <Catalogo/>
  },
  {
    path: '/catalogoUSer',
    element: <CatalogoUser/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </StrictMode>,
)
