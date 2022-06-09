import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import SignOutButton from './SignOutButton'
import { useRouter } from 'next/router'
import { useAuthContext } from '~/contexts/AuthContext'

interface LayoutProps {
  children: ReactNode
  isPrivate?: boolean
}

export default function Layout({ children, isPrivate }: LayoutProps) {
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isPrivate && !isAuthenticated) {
      router.push('/sign-in', undefined, { shallow: false })
    }
  })

  return (
    <div>
      <Head>
        <title>Sapiens</title>
      </Head>
      <SignOutButton />
      {children}
    </div>
  )
}
