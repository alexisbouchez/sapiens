import Link from 'next/link'
import type { Profile } from '~/types'

interface ProfilesList {
  profiles: Profile[]
}

export default function ProfilesList({ profiles }: ProfilesList) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {[...profiles, ...profiles].map((profile) => (
        <Link key={profile.id} href={`/profiles/${profile.id}`}>
          <a className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
            <li>{profile.user?.name}</li>
            <img src={profile.avatar} />
          </a>
        </Link>
      ))}
    </ul>
  )
}
