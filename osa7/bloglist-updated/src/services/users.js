import axios from 'axios'
const baseUrl = '/api/users'

const getByUserName = async (username) => {
  const response = await axios.get(baseUrl)
  return response.data.find(x => x.username === username)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getByUserName, getAll }