import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import ProfileBanner from '~/components/profiles/ProfileBanner'
import useMe from '~/hooks/useMe'
import apolloClient from '~/lib/graphql/apolloClient'
import {
  GET_PROFILE_BY_ID,
  QUERY_PROFILE_IDS,
} from '~/lib/graphql/queries/profiles'
import type { Page, Profile as IProfile } from '~/types'

const ProfilePage: Page<Props> = ({ profile }) => {
  const { me } = useMe()

  console.log(profile)

  return (
    <>
      <Head>
        <title>{profile.user?.name}</title>
      </Head>

      <ProfileBanner
        freelancerId={profile.user?.id!}
        freelancerProfileId={profile.id}
        name={profile.user?.name!}
        profile={profile}
      />
    </>
  )
}

export default ProfilePage

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles: IProfile[] = []

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
  profile: IProfile
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
  } catch (error: any) {
    return { notFound: true }
  }
}
