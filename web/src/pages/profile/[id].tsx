import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import Container from '~/components/common/Container'
import apolloClient from '~/lib/graphql/apolloClient'
import {
  GET_PROFILE_BY_ID,
  QUERY_PROFILE_IDS,
} from '~/lib/graphql/queries/profiles'
import type { Page, Profile } from '~/types'

const ProfilePage: Page<Props> = ({ profile }) => {
  return (
    <Container>
      <Head>
        <title>{profile.name}</title>
      </Head>

      <h1>{profile.name}</h1>
    </Container>
  )
}

export default ProfilePage

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles: Profile[] = []

  try {
    const { data } = await apolloClient.query({
      query: QUERY_PROFILE_IDS,
    })

    profiles.push(...data.profiles)
  } catch {}

  const paths = profiles.map((profile) => ({
    params: { id: profile.id },
  }))

  return { paths, fallback: false }
}

interface Props {
  profile: Profile
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_PROFILE_BY_ID,
      variables: { id: ctx.params!.id },
    })

    return { props: { profile: data.profile }, revalidate: 1 }
  } catch {
    return { notFound: true }
  }
}
