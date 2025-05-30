import { type JSX } from 'react'

import ExploreContent from '@components/explore'
import Footer from '@components/footer'

export const dynamic = 'force-dynamic'

function Explore(): JSX.Element {
  return (
    <div>
      <h2 className="w-full text-3xl md:text-4xl font-bold text-center mb-6 max-lg:flex max-lg:flex-wrap max-lg:justify-center">
        Explora&nbsp;
        <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
          sopas de letras
        </span>
      </h2>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto text-center">
        Explora las sopas de letras que han sido compartidas por los usuarios.
        Encuentra tu próximo desafío perfecto.
      </p>
      <ExploreContent />
      <Footer />
    </div>
  )
}

export default Explore
