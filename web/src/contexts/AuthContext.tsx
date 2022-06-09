import { createContext, useContext, useState } from 'react'

export interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
})

export const AuthProvider = ({
  children,
  isAuthenticated: isAuthenticatedProp,
}: { children: React.ReactNode } & { isAuthenticated: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedProp)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
