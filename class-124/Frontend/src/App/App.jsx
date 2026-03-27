import { RouterProvider } from "react-router"
import React from 'react'
import { router } from "./App.Routes"

const App = () => {
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default App