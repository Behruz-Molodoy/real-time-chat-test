import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/consts";
import { Chat, Login } from './components/'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE, Component: Login
  },
  {
    path: "*", Component: Login
  }
]

export const privateRoutes = [
  {
    path: CHAT_ROUTE, Component: Chat
  },
  {
    path: "*", Component: Chat
  }
]