import Image from 'next/image'
import Link from 'next/link'
import useAuthContext from '~/hooks/useAuthContext'
import AccountMenu from './AccountMenu'

export default function Header() {
  const { isAuthenticated } = useAuthContext()

  return (
    <header className="bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-900 lg:border-none">
          <div></div>
          <div className="flex items-center">
            <Link href="/">
              <a>
                <span className="sr-only">Sapiens</span>
                <Image
                  src="/logo.svg"
                  height={30}
                  width={30}
                  className="mx-auto h-12 w-auto"
                />
              </a>
            </Link>
          </div>

          {isAuthenticated() ? (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <AccountMenu />
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link href="/sign-in">
                <a className="whitespace-nowrap text-base font-medium text-white hover:text-gray-200">
                  Sign in
                </a>
              </Link>
              <Link href="/sign-up">
                <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Sign up
                </a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
