import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { AuthContextProps } from './contexts/auth/AuthContext'

type AdditionalPageProps = {
  isPrivate?: boolean
  title?: string
}

export type MyAppProps = AppProps &
  AuthContextProps & {
    Component: AdditionalPageProps
  }

export type Page<T = {}> = NextPage<T> & AdditionalPageProps

export type Errors = Record<string, string[]> | string

export type User = {
  id: string
  email: string
  role: Role
  profile?: Profile
}

export type Profile = {
  id: string
  name: string
  userId?: string
}

export type Chat = {
  id: string
  message: string
  userId: string
}

export enum Role {
  FREELANCER = 'FREELANCER',
  RECRUITER = 'RECRUITER',
}
