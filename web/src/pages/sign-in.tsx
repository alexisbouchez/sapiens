import { useMutation } from '@apollo/client'
import type { Page } from '~/types'
import { useRouter } from 'next/router'
import SubmitButton from '~/components/common/forms/buttons/SubmitButton'
import InputField from '~/components/common/forms/fields/InputField'
import useAuthContext from '~/hooks/useAuthContext'
import useForm from '~/hooks/useForm'
import { SIGN_IN } from '~/lib/graphql/mutations/auth'
import AuthHeader from '~/components/auth/AuthHeader'
import Link from 'next/link'

export default function SignIn() {
  const [signIn, { loading }] = useMutation(SIGN_IN)
  const { setMe } = useAuthContext()
  const router = useRouter()

  const { variables, onChange, onSubmit, otherError } = useForm({
    initialVariables: { email: '', password: '' },
    handleSubmit: async (variables) => {
      const { data } = await signIn({ variables })
      setMe(data.signIn)
      router.push('/settings')
    },
  })

  return (
    <>
      <div className="fullheight flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <AuthHeader title="Sign in to your account.">
              Not signed up yet ?{' '}
              <Link href="/sign-up">
                <a className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up.
                </a>
              </Link>
            </AuthHeader>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <InputField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="john.doe@gmail.com"
                    value={variables.email}
                    onChange={onChange}
                  />
                  <InputField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••••••••••"
                    value={variables.password}
                    onChange={onChange}
                  />

                  {otherError ? (
                    <p className="text-red-600">{otherError}</p>
                  ) : null}

                  <SubmitButton loading={loading} className="w-full">
                    {loading ? 'Signing in...' : 'Sign in'}
                  </SubmitButton>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
