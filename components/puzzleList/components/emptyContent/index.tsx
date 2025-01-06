import { type JSX } from 'react'
import { Link } from '@nextui-org/link'

function EmptyContent(): JSX.Element {
  return (
    <p className="text-gray-500 mt-24">
      No hay sopas de letras creadas por ti, puedes crear una ó&nbsp;
      <Link href="/explore">explorar</Link> las que la comunidad ha compartido.
    </p>
  )
}

export default EmptyContent
