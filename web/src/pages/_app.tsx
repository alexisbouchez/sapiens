import '~/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppContext } from 'next/app'
import App from 'next/app'
import apolloClient from '~/lib/graphql/apolloClient'
import { AuthProvider } from '~/contexts/AuthContext'
import Layout from '~/components/Layout'
import { ME } from '~/lib/graphql/mutations/user'
import { MyAppProps } from '~/types'
import isValidAuthCookie from '~/lib/isValidAuthCookie'

function MyApp({ Component, pageProps, isAuthenticated }: MyAppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider isAuthenticated={isAuthenticated}>
        <Layout isPrivate={Component.isPrivate}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookies = appContext.ctx.req?.headers.cookie?.split('; ') || []

  let isAuthenticated = false

  if (cookies.some(isValidAuthCookie)) {
    try {
      await apolloClient.query({
        query: ME,
        context: {
          headers: {
            cookie: appContext.ctx.req?.headers.cookie,
          },
        },
      })
      isAuthenticated = true
    } catch {}
  }

  const props = await App.getInitialProps(appContext)

  return { ...props, isAuthenticated }
}
