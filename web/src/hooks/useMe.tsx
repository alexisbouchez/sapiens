import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import useAuthContext from '~/hooks/useAuthContext'
import { ME } from '~/lib/graphql/mutations/users'

const useMe = () => {
  const { me, setMe } = useAuthContext()
  const { data } = useQuery(ME, { fetchPolicy: 'network-only' })

  useEffect(() => {
    if (data && data.me.email !== me?.email) {
      setMe(data.me)
    }
  }, [data])

  return { me, setMe }
}

export default useMe
