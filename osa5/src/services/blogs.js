import axios from 'axios'
const baseUrl = '/api/blogs'

let _token;
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (token) => {
  _token = token
}
export default { getAll, setToken }