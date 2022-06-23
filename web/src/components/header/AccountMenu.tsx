import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import useMe from '~/hooks/useMe'

export default function AccountMenu() {
  const { me } = useMe()

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75">
              Account
              {open ? (
                <ChevronUpIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-4 py-3">
                <p className="text-sm font-semibold">Welcome !</p>
                <p className="truncate text-sm font-medium text-gray-900"></p>
              </div>
              <div className="py-1">
                <Menu.Item>
                  <Link href="/conversations">
                    <a className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900">
                      Conversations
                    </a>
                  </Link>
                </Menu.Item>
                {me?.role === 'FREELANCER' && (
                  <Menu.Item>
                    <Link
                      href={`/profiles/${
                        me?.profile?.id ? me?.profile?.id : 'create'
                      }`}
                    >
                      <a className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900">
                        Profile
                      </a>
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <Link href="/settings">
                    <a className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900">
                      Settings
                    </a>
                  </Link>
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  <SignOutButton />
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
