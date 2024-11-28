import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Feed from './Feed'
import Home from './Home'
import Profile from './Profile'
import Login from './Login'

const Body = () => {

    const appRouter= createBrowserRouter(
        [
            {
                path: '/',
                element:<Home></Home>,
                children:[
                     {
                        path:'/',
                        element:<Feed></Feed>
                     },
                     {
                        path:'/profile/:id',
                        element:<Profile></Profile>,
                     }
                ]

            },
            {
                path:'/login',
                element:<Login></Login>
            }
        ]
    )

  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default Body
