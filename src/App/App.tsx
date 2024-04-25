import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/Login'

function App() {
  const routers = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>
    }
  ])
  return (
    <>
      <RouterProvider router={routers}/>
    </>
  )
}

export default App
