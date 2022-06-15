import type { GetStaticProps } from 'next'
import Container from '~/components/common/Container'
import apolloClient from '~/lib/graphql/apolloClient'
import type { Page, Profile } from '~/types'
import { QUERY_PROFILES } from '~/lib/graphql/queries/profiles'
import ProfilesList from '~/components/profiles/ProfilesList'

const ProfilesPage: Page<Props> = ({ profiles }) => {
  return (
    <Container>
      <h1>Profiles</h1>
      <ProfilesList profiles={profiles} />
    </Container>
  )
}

export default ProfilesPage

interface Props {
  profiles: Profile[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const {
      data: { profiles },
    } = await apolloClient.query({
      query: QUERY_PROFILES,
    })

    return { props: { profiles } }
  } catch {
    return { props: { profiles: [] } }
  }
}
