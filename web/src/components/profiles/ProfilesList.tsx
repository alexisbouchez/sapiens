import Link from 'next/link'
import type { Profile } from '~/types'

interface ProfilesList {
  profiles: Profile[]
}

export default function ProfilesList({ profiles }: ProfilesList) {
  return (
    <ul>
      {profiles.map((profile) => (
        <Link key={profile.id} href={`/profiles/${profile.id}`}>
          <a>
            <li>{profile.user?.name}</li>
          </a>
        </Link>
      ))}
    </ul>
  )
}
