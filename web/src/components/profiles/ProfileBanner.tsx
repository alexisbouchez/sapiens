import { MailIcon, PencilIcon, PhoneIcon } from '@heroicons/react/solid'
import { ChangeEvent, useRef } from 'react'
import useMe from '~/hooks/useMe'
import { Profile } from '~/types'
import ChatButton from '../chat/ChatButton'

const profile = {
  name: 'Ricardo Cooper',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990'],
  ],
}

export interface ProfileBannerProps {
  freelancerId: string
  freelancerProfileId: string
  name: string
  profile: Profile
}

export default function ProfileBanner({
  freelancerId,
  freelancerProfileId,
  name,
  profile: pprofile,
}: ProfileBannerProps) {
  const { me } = useMe()

  const inputAvatarRef = useRef<HTMLInputElement>(null)

  const onAvatarClick = () => {
    if (inputAvatarRef.current) {
      inputAvatarRef.current.click()
    }
  }

  const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0]
      const body = new FormData()
      body.append('avatar', file)

      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${freelancerProfileId}/avatar`,
        {
          method: 'PUT',
          body,
        },
      )
    }
  }

  return (
    <div>
      <input
        type="file"
        hidden
        ref={inputAvatarRef}
        onChange={onAvatarChange}
      />
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={profile.backgroundImage}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <span className="inline-block relative">
              <img
                className={`h-24 w-24 rounded-full ring-4 bg-white ring-white sm:h-32 sm:w-32 ${
                  me?.id === freelancerId
                    ? 'hover:opacity-90 hover:cursor-pointer'
                    : ''
                }`}
                src={pprofile.avatar || profile.avatar}
                alt=""
                onClick={
                  me && me.id === freelancerId ? onAvatarClick : undefined
                }
              />
              {me && me.id === freelancerId && (
                <span
                  className="absolute bottom-0 right-0 block h-6 w-6 rounded-full ring-2 ring-gray-100 bg-white hover:bg-gray-200 hover:cursor-pointer"
                  onClick={onAvatarClick}
                >
                  <PencilIcon />
                </span>
              )}
            </span>
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {name}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <ChatButton freelancerId={freelancerId} />
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {profile.name}
          </h1>
        </div>
      </div>
    </div>
  )
}
