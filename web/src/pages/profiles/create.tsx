import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
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

  const { setVariables, errors, variables, onChange, onSubmit } = useForm<{
    price: number
    avatar: null | File
  }>({
    initialVariables: {
      price: 150,
      avatar: null,
    },
    handleSubmit: async (variables) => {
      console.log('variables', variables)
      const { data } = await createProfile({ variables })
      setMe({ ...me!, profile: data.createProfile })
      router.push('/profiles/[id]', `/profiles/${data.createProfile.id}`)
    },
  })

  const onAvatarChange = ({
    target: { validity, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (validity.valid && files?.length === 1) {
      setVariables({ ...variables, avatar: files[0] })
    }
  }

  return (
    <Container>
      <form className="space-y-4" onSubmit={onSubmit}>
        <h1>Create profile</h1>
        <InputField
          name="price"
          id="price"
          label="Daily rate"
          placeholder="300$"
          min="150"
          type="number"
          step="10"
          value={variables.price}
          onChange={onChange}
          errors={errors.price}
        />

        {errors.other && (
          <div className="text-red-500 text-sm">{errors.other}</div>
        )}

        <InputField
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          label="Avatar"
          onChange={onAvatarChange}
          errors={errors.avatar}
        />

        <SubmitButton loading={loading}>Create profile</SubmitButton>
      </form>
    </Container>
  )
}

export default CreateProfilePage
