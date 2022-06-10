import { useMutation } from '@apollo/client'
import type { Page } from '~/types'
import { useRouter } from 'next/router'
import SubmitButton from '~/components/common/forms/buttons/SubmitButton'
import InputField from '~/components/common/forms/fields/InputField'
import useAuthContext from '~/hooks/useAuthContext'
import useForm from '~/hooks/useForm'
import { SIGN_UP } from '~/lib/graphql/mutations/auth'

const SignUp: Page = () => {
  const [signUp, { loading }] = useMutation(SIGN_UP)
  const router = useRouter()
  const { setMe } = useAuthContext()

  const { variables, onChange, onSubmit, errors, otherError } = useForm({
    initialVariables: { email: '', password: '' },
    handleSubmit: async (variables) => {
      const { data } = await signUp({ variables })

      setMe(data.signUp)
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
        errors={errors.email}
      />

      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={variables.password}
        onChange={onChange}
        errors={errors.password}
      />

      {otherError ? <p>{otherError}</p> : null}

      <SubmitButton loading={loading} />
    </form>
  )
}

export default SignUp
