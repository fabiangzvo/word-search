import type { ChangeEventHandler, JSX } from 'react'
import { Select, SelectItem } from '@heroui/select'
import { Component } from 'lucide-react'

interface DifficultDropdownProps {
  onChange: ChangeEventHandler<HTMLSelectElement>
  value?: string[]
}

function DifficultDropdown({
  onChange,
  value,
}: DifficultDropdownProps): JSX.Element {
  return (
    <Select
      classNames={{
        selectorIcon: 'text-default-500',
        trigger:
          'border-default-200 dark:border-default-500 data-\[open\=true\]\:border-default-800 data-\[focus\=true\]\:border-default-700',
      }}
      label="Dificultad"
      placeholder="Seleccionar"
      selectedKeys={value ?? []}
      size="sm"
      startContent={<Component className="text-default-500" size={15} />}
      variant="bordered"
      onChange={onChange}
    >
      <SelectItem key="easy">Fácil</SelectItem>
      <SelectItem key="medium">Medio</SelectItem>
      <SelectItem key="hard">Difícil</SelectItem>
    </Select>
  )
}

export default DifficultDropdown
