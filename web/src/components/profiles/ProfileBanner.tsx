import { MailIcon, PencilIcon, PhoneIcon } from '@heroicons/react/solid'
import { ChangeEvent, useRef, useState } from 'react'
import {
  placeholderAvatar,
  placeholderBackground,
} from '~/constants/placeholders'
import useMe from '~/hooks/useMe'
import { Profile } from '~/types'
import ChatButton from '../chat/ChatButton'

export interface ProfileBannerProps {
  profile: Profile
}

export default function ProfileBanner({ profile }: ProfileBannerProps) {
  const { me, setMe } = useMe()

  const inputAvatarRef = useRef<HTMLInputElement>(null)

  const onAvatarClick = () => {
    if (inputAvatarRef.current) {
      inputAvatarRef.current.click()
    }
  }

  const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0]

      // Preview
      const oldAvatar = me?.profile?.avatar

      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () =>
          setMe({
            ...me!,
            profile: { ...profile, avatar: reader.result as string },
          }),
        false,
      )

      if (file) {
        reader.readAsDataURL(file)
      }

      // Upload
      const body = new FormData()
      body.append('avatar', file)

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${profile.id}/avatar`,
          {
            method: 'PUT',
            body,
          },
        )
      } catch (error) {
        setMe({
          ...me!,
          profile: { ...profile, avatar: oldAvatar || '' },
        })
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        hidden
        ref={inputAvatarRef}
        onChange={onAvatarChange}
        accept="image/*"
      />
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={placeholderBackground}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <span className="inline-block relative">
              <img
                className={`h-24 w-24 rounded-full ring-4 bg-white ring-white sm:h-32 sm:w-32 ${
                  me?.id === profile.user!.id
                    ? 'hover:opacity-90 hover:cursor-pointer'
                    : ''
                }`}
                src={me?.profile?.avatar || profile.avatar || placeholderAvatar}
                alt=""
                onClick={
                  me && me.id === profile.user!.id ? onAvatarClick : undefined
                }
              />
              {me && me.id === profile.user!.id && (
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
                {profile.user!.name}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <ChatButton freelancerId={profile.user!.id} />
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {profile.user!.name}
          </h1>
        </div>
      </div>
    </div>
  )
}
