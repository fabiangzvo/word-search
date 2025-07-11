import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

export async function handleSubmit(
  _: string,
  formData: FormData
): Promise<string> {
  const response = await signIn('credentials', {
    email: formData.get('email'),
    password: formData.get('password'),
    callbackUrl: '/dashboard',
    redirect: false,
  })

  if (response?.status === 200) redirect('/dashboard')

  return response?.error ?? ''
}
