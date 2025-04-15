'use client'

import { useState, useCallback, useMemo, type JSX } from 'react'
import { Input, Tooltip, InputProps } from '@heroui/react'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'

function PasswordInput(props: Omit<InputProps, 'type'>): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible])

  const { icon, type, tooltip } = useMemo(() => {
    if (isVisible) {
      return {
        tooltip: 'Ocultar contraseña',
        type: 'text',
        icon: (
          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
        ),
      }
    }

    return {
      tooltip: 'Ver contraseña',
      type: 'password',
      icon: (
        <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
      ),
    }
  }, [isVisible])

  return (
    <Input
      isRequired
      endContent={
        <Tooltip content={tooltip}>
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {icon}
          </button>
        </Tooltip>
      }
      errorMessage="Completa este campo"
      label="Contraseña"
      name="password"
      placeholder="tu contraseña"
      type={type}
      variant="bordered"
      {...props}
    />
  )
}

export default PasswordInput
