import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { AuthContextProps } from './contexts/AuthContext'

export type MyAppProps = AppProps &
  AuthContextProps & {
    Component: {
      isPrivate?: boolean
    }
  }

export type Page = NextPage & { isPrivate?: boolean }
