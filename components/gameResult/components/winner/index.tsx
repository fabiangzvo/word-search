import { Fragment, JSX } from 'react'
import { Chip } from '@heroui/chip'
import { Crown } from 'lucide-react'

import { WinnerProps } from './types'

function Winner({ name, questions }: WinnerProps): JSX.Element {
  return (
    <Fragment>
      <Chip
        variant="flat"
        avatar={<Crown size={24} />}
        classNames={{ content: 'font-bold text-lg' }}
      >
        Ganador
      </Chip>
      <div className="h-14 w-14 font-bold rounded-full bg-default-500 flex items-center justify-center text-xl my-2 text-white dark:text-black">
        1
      </div>
      <span className="font-semibold">{name}</span>
      <span className="text-sm">{questions} Palabras</span>
    </Fragment>
  )
}

export default Winner
