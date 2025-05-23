import { JSX } from 'react'
import { Link } from '@heroui/link'

function EmptyContent(): JSX.Element {
  return (
    <p className="text-gray-500 mt-24 text-center">
      No hay sopas de letras compartidas por la comunidad, puedes&nbsp;
      <Link href="/puzzle/create">crearla</Link> y ser el primero en
      compartirla.
    </p>
  )
}

export default EmptyContent
