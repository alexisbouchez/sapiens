import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useAuthContext from '~/hooks/useAuthContext'
import Header from './header/Header'

interface LayoutProps {
  children: ReactNode
  isPrivate?: boolean
  isPublic?: boolean
  title?: string
}

export default function Layout({
  children,
  isPrivate,
  isPublic,
  title,
}: LayoutProps) {
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
    <div className="fullheight">
      <Head>
        <title>Sapiens {title && `- ${title}`}</title>
      </Head>
      <Header />
      {children}
    </div>
  )
}
