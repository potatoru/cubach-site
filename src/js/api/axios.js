import axios from 'axios'

const baseURL = "https://shop.cubach.com"
const instance = axios.create({ baseURL })

export default instance
