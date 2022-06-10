import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import useAuthContext from '~/hooks/useAuthContext'
import { SIGN_OUT } from '~/lib/graphql/mutations/auth'

export default function SignOutButton() {
  const [signOut, { loading }] = useMutation(SIGN_OUT)
  const { isAuthenticated, setMe } = useAuthContext()
  const router = useRouter()

  const onSignOut = async () => {
    await signOut()
    setMe(undefined)
    router.push('/sign-in', undefined, { shallow: false })
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <button onClick={onSignOut} disabled={loading}>
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
