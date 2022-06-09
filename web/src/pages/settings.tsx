import { useQuery } from '@apollo/client'
import Layout from '~/components/Layout'
import { ME } from '~/lib/graphql/mutations/user'
import type { Page } from '~/types'

const Settings: Page = () => {
  const { data } = useQuery(ME)

  return (
    <form>
      <input
        type="email"
        id="email"
        name="email"
        defaultValue={data?.me?.email}
      />

      <div>
        <button type="reset">Cancel</button>
      </div>
    </form>
  )
}

export default Settings

Settings.isPrivate = true
