import axios from 'axios'
import Cookies from 'js-cookie'
// import Cookie from 'js-cookie'

const api = axios.create({
  baseURL: process.env.BE_URL,
  withCredentials: true,
})


api.interceptors.request.use((config) => {
   const token = Cookies.get('auth_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { api }