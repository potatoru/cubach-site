import axios from 'axios'

const baseURL = "https://shop.cubach.com/api"
const instance = axios.create({ baseURL })

export default instance
