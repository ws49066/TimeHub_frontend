import {jwtDecode} from 'jwt-decode'
import { User } from './auth.types'

export function decodeToken(token: string): User {
  return jwtDecode<User>(token)
}
