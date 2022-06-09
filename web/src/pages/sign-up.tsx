import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '~/components/Layout'
import { useAuthContext } from '~/contexts/AuthContext'
import { SIGN_UP } from '~/lib/graphql/mutations/auth'

const SignUp: NextPage = () => {
  const [authCredentials, setAuthCredentials] = useState({
    email: '',
    password: '',
  })

  const [signUp, { loading, error }] = useMutation(SIGN_UP)

  const { setIsAuthenticated } = useAuthContext()

  const router = useRouter()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCredentials({
      ...authCredentials,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await signUp({ variables: authCredentials })

      setIsAuthenticated(true)
      router.push('/settings')
    } catch {
      console.error(error)
    }
  }

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={authCredentials.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={authCredentials.password}
            onChange={onChange}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default SignUp
