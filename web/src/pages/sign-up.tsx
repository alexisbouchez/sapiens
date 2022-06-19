import { useMutation } from '@apollo/client'
import type { Page } from '~/types'
import { useRouter } from 'next/router'
import SubmitButton from '~/components/common/forms/buttons/SubmitButton'
import InputField from '~/components/common/forms/fields/InputField'
import useAuthContext from '~/hooks/useAuthContext'
import useForm from '~/hooks/useForm'
import { SIGN_UP } from '~/lib/graphql/mutations/auth'
import AuthHeader from '~/components/auth/AuthHeader'
import Link from 'next/link'

const roles = [
  { id: 'FREELANCER', title: 'Freelancer' },
  { id: 'RECRUITER', title: 'Recruiter' },
]

const SignUp: Page = () => {
  const [signUp, { loading }] = useMutation(SIGN_UP)
  const router = useRouter()
  const { setMe } = useAuthContext()

  const { variables, setVariables, onChange, onSubmit, errors, otherError } =
    useForm({
      initialVariables: {
        email: '',
        password: '',
        name: '',
        role: 'FREELANCER',
      },
      handleSubmit: async (variables) => {
        const { data } = await signUp({ variables })

        setMe(data.signUp)
        router.push('/settings')
      },
    })

  return (
    <>
      <div className="fullheight flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <AuthHeader title="Create your account.">
              Already signed up ?{' '}
              <Link href="/sign-in">
                <a className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in.
                </a>
              </Link>
            </AuthHeader>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <fieldset className="mt-4 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {roles.map((role) => (
                      <div key={role.id} className="flex items-center">
                        <input
                          id={role.id}
                          name="role"
                          type="radio"
                          defaultChecked={role.id === 'FREELANCER'}
                          onChange={({ target: { id } }) => {
                            setVariables({ ...variables, role: id })
                          }}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label
                          htmlFor={role.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {role.title}
                        </label>
                      </div>
                    ))}
                  </fieldset>

                  <InputField
                    id="name"
                    name="name"
                    label="Full name"
                    type="text"
                    placeholder="John Doe"
                    value={variables.name}
                    onChange={onChange}
                    errors={errors.name}
                  />
                  <InputField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="john.doe@gmail.com"
                    value={variables.email}
                    onChange={onChange}
                    errors={errors.email}
                  />
                  <InputField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••••••••••"
                    value={variables.password}
                    onChange={onChange}
                    errors={errors.password}
                  />

                  {otherError ? (
                    <p className="text-red-600">{otherError}</p>
                  ) : null}

                  <SubmitButton loading={loading} className="w-full">
                    {loading ? 'Signing up...' : 'Sign up'}
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

SignUp.title = 'Sign Up'

export default SignUp
