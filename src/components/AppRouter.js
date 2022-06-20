import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'

export default function AppRouter() {
  const isUser = useSelector(({ user }) => user.isUser)
  const navigateRoute = useNavigate()

  React.useEffect(() => {
    isUser ? navigateRoute(CHAT_ROUTE) : navigateRoute(LOGIN_ROUTE)
  }, [isUser])

  return (
    <Routes>
      {isUser
        ? privateRoutes.map(({ path, Component }) => <Route path={path} element={<Component />} key={path} />)
        : publicRoutes.map(({ path, Component }) => <Route path={path} element={<Component />} key={path} />)
      }
    </Routes>
  )
}



