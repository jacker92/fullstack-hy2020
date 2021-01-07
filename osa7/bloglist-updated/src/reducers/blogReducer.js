import blogService from './../services/blogs'
import { setSuccess, setError } from './notificationReducer'

const reducer = (state = [], action) => {
  console.log('In reducer func!', state, action)
  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(x => x.id !== action.data.id)
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    return state.map(x => {
      if (x.id === action.data.id) {
        return action.data
      }
      return x
    })
  default:
    return state
  }
}

export const addBlog = (blog) => {
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
  return async dispatch => {
    if (!window.confirm(`Remove blog ${blog.title}`)) {
      return
    }
    try {
      await blogService.remove(blog)
      dispatch({ type: 'REMOVE_BLOG', data: blog })
      dispatch(setSuccess(`Blog ${blog.title} by ${blog.author} removed`))
    } catch (e) {
      dispatch(setError(e.response.data.error))
    }
  }
}

export const setLike = (blog) => {
  return async dispatch => {
    blog.likes += 1
    await blogService.update(blog)
    dispatch({ type: 'LIKE_BLOG', data: blog })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const anecdotes = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: anecdotes })
  }
}

export default reducer