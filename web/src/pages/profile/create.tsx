import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Container from '~/components/common/Container'
import SubmitButton from '~/components/common/forms/buttons/SubmitButton'
import InputField from '~/components/common/forms/fields/InputField'
import useForm from '~/hooks/useForm'
import useMe from '~/hooks/useMe'
import { CREATE_PROFILE } from '~/lib/graphql/mutations/profiles'
import type { Page } from '~/types'

const CreateProfilePage: Page = () => {
  const [createProfile, { loading }] = useMutation(CREATE_PROFILE)
  const { me, setMe } = useMe()
  const router = useRouter()

  const { errors, variables, onChange, onSubmit } = useForm({
    initialVariables: {
      name: '',
    },
    handleSubmit: async (variables) => {
      const { data } = await createProfile({ variables })
      setMe({ ...me!, profile: data.createProfile })
      router.push('/profile/[id]', `/profile/${data.createProfile.id}`)
    },
  })

  return (
    <Container>
      <form className="space-y-4" onSubmit={onSubmit}>
        <h1>Create profile</h1>
        <InputField
          name="name"
          id="name"
          label="Name"
          placeholder="John Doe"
          value={variables.name}
          onChange={onChange}
          errors={errors.name}
        />

        {errors.other && (
          <div className="text-red-500 text-sm">{errors.other}</div>
        )}

        <SubmitButton loading={loading}>Create profile</SubmitButton>
      </form>
    </Container>
  )
}

export default CreateProfilePage
