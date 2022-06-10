import { useMutation } from '@apollo/client'
import type { Page } from '~/types'
import { useRouter } from 'next/router'
import SubmitButton from '~/components/common/forms/buttons/SubmitButton'
import InputField from '~/components/common/forms/fields/InputField'
import useAuthContext from '~/hooks/useAuthContext'
import useForm from '~/hooks/useForm'
import { SIGN_IN } from '~/lib/graphql/mutations/auth'

const SignIn: Page = () => {
  const [signIn, { loading, error }] = useMutation(SIGN_IN)
  const { setMe } = useAuthContext()
  const router = useRouter()

  const { variables, onChange, onSubmit } = useForm({
    initialVariables: { email: '', password: '' },
    handleSubmit: async (variables) => {
      const { data } = await signIn({ variables })
      setMe(data.signIn)
      router.push('/settings')
    },
  })

  return (
    <form onSubmit={onSubmit}>
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={variables.email}
        onChange={onChange}
      />
      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={variables.password}
        onChange={onChange}
      />
      {error ? <p>{error.message}</p> : null}
      <SubmitButton loading={loading} />
    </form>
  )
}

export default SignIn
