import Link from 'next/link'
import useAuthContext from '~/hooks/useAuthContext'
import type { Page } from '~/types'

const Home: Page = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <div>
      {isAuthenticated() ? (
        <Link href="/settings">
          <a className="text-blue-600">Settings</a>
        </Link>
      ) : null}
    </div>
  )
}

export default Home
