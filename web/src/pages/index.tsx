import Link from 'next/link'
import useAuthContext from '~/hooks/useAuthContext'
import type { Page } from '~/types'

const Home: Page = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <div>
      {isAuthenticated() ? (
        <Link href="/settings">
          <a>Settings</a>
        </Link>
      ) : null}
    </div>
  )
}

export default Home
