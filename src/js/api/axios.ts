import axios from 'axios'

const baseURL = "https://api.cubach.com"
const instance = axios.create({ baseURL })

export default instance
