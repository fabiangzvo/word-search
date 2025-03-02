import { VariantProps } from 'tailwind-variants'

import { buttonVariants } from './index'

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface LetterCellProps {
  letter: string
  onSelect: () => void
  onMouseEnter: () => void
  severity?: ButtonVariantProps['color']
}
