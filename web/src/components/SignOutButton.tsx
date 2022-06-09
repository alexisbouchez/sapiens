import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useAuthContext } from '~/contexts/AuthContext'
import { SIGN_OUT } from '~/lib/graphql/mutations/auth'

export default function SignOutButton() {
  const [signOut, { data, loading, error }] = useMutation(SIGN_OUT)
  const { isAuthenticated, setIsAuthenticated } = useAuthContext()
  const router = useRouter()

  const onSignOut = async () => {
    await signOut()
    setIsAuthenticated(false)
    router.push('/sign-in', undefined, { shallow: false })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <button onClick={onSignOut} disabled={loading}>
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
