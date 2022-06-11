import '~/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppContext } from 'next/app'
import App from 'next/app'
import apolloClient from '~/lib/graphql/apolloClient'
import AuthProvider from '~/contexts/auth/AuthProvider'
import Layout from '~/components/Layout'
import { ME } from '~/lib/graphql/mutations/users'
import { MyAppProps } from '~/types'
import isValidAuthCookie from '~/lib/isValidAuthCookie'

function MyApp({ Component, pageProps, me }: MyAppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider me={me}>
        <Layout isPrivate={Component.isPrivate} title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookies = appContext.ctx.req?.headers.cookie?.split('; ') || []

  let me = null

  if (cookies.some(isValidAuthCookie)) {
    try {
      const { data } = await apolloClient.query({
        query: ME,
        context: {
          headers: {
            cookie: appContext.ctx.req?.headers.cookie,
          },
        },
      })
      me = data.me
    } catch {}
  }

  const props = await App.getInitialProps(appContext)

  return { ...props, me }
}
