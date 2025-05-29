import type { JSX } from 'react'

import Footer from '@components/footer'
import SignIn from '@components/signIn'

function Login(): JSX.Element {
  return (
    <section>
      <div className="max-w-2xl mx-auto text-center my-10 px-6">
        <h1 className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight max-lg:text-center">
          <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-600 ">
            Tu aventura
          </span>
          <br />
          <span>comienza aquí</span>
        </h1>
        <p className="text-lg text-gray-600 mb-24 mt-2 max-w-2xl mx-auto max-lg:text-center max-md:mb-20">
          Crea tu cuenta y comienza a jugar en segundos
        </p>
        <SignIn />
      </div>
      <Footer />
    </section>
  )
}

export default Login
