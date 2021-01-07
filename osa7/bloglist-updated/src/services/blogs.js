import axios from 'axios'
const baseUrl = '/api/blogs'

let _token

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const request = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${_token.token}`
    }
  })
  return request.data
}

const remove = async (blog) => {
  const request = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: `Bearer ${_token.token}`
    }
  })
  return request
}

const update = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      Authorization: `Bearer ${_token.token}`
    }
  })
  return request.data
}

const setToken = (token) => {
  _token = token
}
export default { getAll, setToken, create, update, remove }