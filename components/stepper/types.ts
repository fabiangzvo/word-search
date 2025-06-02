import type { ButtonProps } from '@heroui/react'

export type RowStepProps = {
  title?: React.ReactNode
  className?: string
}

export interface StepperProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * An array of steps.
   *
   * @default []
   */
  steps?: RowStepProps[]
  /**
   * The color of the steps.
   *
   * @default "primary"
   */
  color?: ButtonProps['color']
  /**
   * The current step index.
   */
  currentStep?: number
  /**
   * The default step index.
   *
   * @default 0
   */
  defaultStep?: number
  /**
   * Whether to hide the progress bars.
   *
   * @default false
   */
  hideProgressBars?: boolean
  /**
   * The custom class for the steps wrapper.
   */
  className?: string
  /**
   * The custom class for the step.
   */
  stepClassName?: string
  /**
   * Callback function when the step index changes.
   */
  onStepChange?: (stepIndex: number) => void
}
