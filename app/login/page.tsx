import { JSX } from 'react'

import SignIn from '@components/signIn'

interface LoginProps {
  searchParams: Promise<{ error: string }>
}

async function Login({ searchParams }: LoginProps): Promise<JSX.Element> {
  const { error } = await searchParams

  return <SignIn error={error} />
}

export default Login
