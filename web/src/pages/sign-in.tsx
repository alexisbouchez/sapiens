import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthContext } from '~/contexts/AuthContext'
import { SIGN_IN } from '~/lib/graphql/mutations/auth'

const SignIn: NextPage = () => {
  const [authCredentials, setAuthCredentials] = useState({
    email: '',
    password: '',
  })

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN)

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
      await signIn({ variables: authCredentials })

      setIsAuthenticated(true)
      router.push('/')
    } catch {}
  }

  return (
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
      {error ? <p>{error.message}</p> : null}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default SignIn
