import blogService from './../services/blogs'
import { setSuccess, setError } from './notificationReducer'

const reducer = (state = [], action) => {
  console.log('In reducer func!', state, action)
  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const addBlog = (blog) => {
  // eslint-disable-next-line no-unused-vars
  return async dispatch => {
    try {
      const result = await blogService.create(blog)
      dispatch(
        {
          type: 'ADD_BLOG',
          data: {
            result
          }
        })
      dispatch(setSuccess(`A new blog ${result.title} by ${result.author} added`))

    } catch (e) {
      dispatch(setError(e.response.data.error))
    }
  }

}

export const removeBlog = (blog) => {
  // eslint-disable-next-line no-unused-vars
  return async dispatch => {
    console.log('removing blog!')
    //return setNotification(message, 'error')
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const anecdotes = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: anecdotes })
  }
}

export default reducer