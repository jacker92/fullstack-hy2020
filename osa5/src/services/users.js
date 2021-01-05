import axios from 'axios'
const baseUrl = '/api/users'

const getByUserName = async (username) => {
  const response = await axios.get(baseUrl)
  return response.data.find(x => x.username === username)
}

export default { getByUserName }