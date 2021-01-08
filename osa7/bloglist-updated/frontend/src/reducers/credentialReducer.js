import userService from '../services/users'
import loginService from '../services/login'
import { setError } from './notificationReducer'
import blogs from './../services/blogs'

const initialState = {
  token: null,
  username: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const token = await loginService.login(username, password)
      window.localStorage.setItem('token', JSON.stringify(token))
      blogs.setToken(token)
      const response = await userService.getByUserName(username)
      dispatch({
        type: 'SET_USER', data: {
          token,
          username,
          id: response.id
        }
      })
    } catch (e) {
      dispatch(setError(e.response.data.error))
    }
  }

}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    blogs.setToken()
    dispatch({ type: 'SET_USER', data: { username:'null', token:null } })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const asJson = JSON.parse(token)
      const response = await userService.getByUserName(asJson.username)
      console.log('Got response', response)
      blogs.setToken(asJson)
      dispatch({
        type: 'SET_USER', data: {
          token: asJson,
          username: response.username,
          id: response.id
        }
      })
    }
  }
}

export default reducer