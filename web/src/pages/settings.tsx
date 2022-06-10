import { useMutation } from '@apollo/client'
import Link from 'next/link'
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

  const { variables, setVariables, onChange, onSubmit, errors, otherError } =
    useForm({
      initialVariables: { email: me?.email || '' },
      handleSubmit: async (variables) => {
        await updateUser({ variables })
        setMe(variables)
      },
    })

  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="Email"
        type="email"
        id="email"
        name="email"
        value={variables.email}
        onChange={onChange}
        errors={errors.email}
      />

      {otherError ? <p>{otherError}</p> : null}

      <div>
        <CancelButton onClick={() => setVariables(me || { email: '' })} />

        <SubmitButton loading={loading} />
      </div>

      <Link href="/">
        <a>Home</a>
      </Link>
    </form>
  )
}

export default Settings

Settings.isPrivate = true
