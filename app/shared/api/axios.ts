import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'
// import Cookie from 'js-cookie'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})


api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { api }