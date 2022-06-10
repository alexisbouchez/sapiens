import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import SignOutButton from './SignOutButton'
import { useRouter } from 'next/router'
import useAuthContext from '~/hooks/useAuthContext'

interface LayoutProps {
  children: ReactNode
  isPrivate?: boolean
  isPublic?: boolean
}

export default function Layout({ children, isPrivate, isPublic }: LayoutProps) {
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isPrivate && !isAuthenticated()) {
      router.push('/sign-in')
    }

    if (isPublic && isAuthenticated()) {
      router.back()
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
