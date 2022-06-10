import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { AuthContextProps } from './contexts/auth/AuthContext'

type AdditionalPageProps = {
  isPrivate?: boolean
}

export type MyAppProps = AppProps &
  AuthContextProps & {
    Component: AdditionalPageProps
  }

export type Page = NextPage & AdditionalPageProps

export type Errors = Record<string, string[]> | string

export type User = {
  email: string
}
