import { createContext } from 'react'
import type { User } from '~/types'

export interface AuthContextProps {
  isAuthenticated: () => boolean
  me?: User
  setMe: (me?: User) => void
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: () => false,
  setMe: () => {},
})

export default AuthContext
