import { useState } from 'react'
import { User } from '~/types'
import AuthContext from './AuthContext'

export interface AuthProviderProps {
  children: React.ReactNode
  me?: User
}

const AuthProvider = ({ children, me: meProp }: AuthProviderProps) => {
  const [me, setMe] = useState<User | undefined>(meProp)

  const isAuthenticated = () => !!me

  return (
    <AuthContext.Provider value={{ me, setMe, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
