import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from '../components/Home.jsx'
import About  from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import User from '../components/User.jsx'
import Github from '../components/Github.jsx'

//CREATING ROUTES

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"Contact",
        element:<Contact/>
      },
      {
        path:"user/:userid",
        element:<User/>
      },
      {
        path:"github",
        element:<Github/>
      }
    ]
  }
])

// SECOND WAY TO CREATE ROUTES
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout/>} >
//       <Route path='' element={<Home/>} />
//       <Route path='about' element={<About/>} />
//       <Route path='contact' element={<Contact/>} />
//     <Route/>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
