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
    <button
      onClick={onSignOut}
      disabled={loading}
      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900"
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
