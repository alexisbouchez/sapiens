import { useMutation } from '@apollo/client'
import Container from '~/components/common/Container'
import CancelButton from '~/components/common/forms/buttons/CancelButton'
import SubmitButton from '~/components/common/forms/buttons/SubmitButton'
import InputField from '~/components/common/forms/fields/InputField'
import useForm from '~/hooks/useForm'
import useMe from '~/hooks/useMe'
import { UPDATE_USER } from '~/lib/graphql/mutations/users'
import type { Page } from '~/types'

const Settings: Page = () => {
  const { me, setMe } = useMe()
  const [updateUser, { loading }] = useMutation(UPDATE_USER)

  const {
    variables,
    setVariables,
    onChange,
    onSubmit,
    errors,
    otherError,
    setErrors,
    setOtherError,
  } = useForm({
    initialVariables: { email: me?.email || '' },
    handleSubmit: async (variables) => {
      await updateUser({ variables })
      setMe(variables)
    },
  })

  const onCancel = () => {
    setVariables({ email: me?.email || '' })
    setErrors({})
    setOtherError('')
  }

  return (
    <Container>
      <form onSubmit={onSubmit} className="fullheight space-y-4 py-8">
        <div>
          <h3 className="border-b pb-4 text-lg font-medium leading-6 text-gray-900">
            Settings
          </h3>
        </div>

        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={variables.email}
          onChange={onChange}
          errors={errors.email}
        />

        {otherError ? <p className="text-red-600">{otherError}</p> : null}

        <div className="flex">
          <CancelButton onClick={onCancel} />

          <SubmitButton loading={loading} className="ml-2">
            {loading ? 'Saving...' : 'Save'}
          </SubmitButton>
        </div>
      </form>
    </Container>
  )
}

export default Settings

Settings.isPrivate = true
Settings.title = 'Settings'
