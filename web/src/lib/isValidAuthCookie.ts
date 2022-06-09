export default function isValidAuthCookie(cookie: string) {
  const cookieKey = '__sapiens_auth_token__'

  if (!cookie.startsWith(cookieKey)) {
    return false
  }

  const splittedCookie = cookie.split('=')

  if (splittedCookie.length !== 2) {
    return false
  }

  if (splittedCookie[1].length < 1) {
    return false
  }

  return true
}
