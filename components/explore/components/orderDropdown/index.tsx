import { JSX } from 'react'
import { Select, SelectItem } from '@heroui/select'
import type { SharedSelection } from '@heroui/system'
import { ArrowDownWideNarrow } from 'lucide-react'

interface OrderDropdownProps {
  onChange: (value: SharedSelection) => void
  value?: string[]
}

function OrderDropdown({ onChange, value }: OrderDropdownProps): JSX.Element {
  return (
    <Select
      classNames={{
        selectorIcon: 'text-default-500',
        trigger:
          'border-default-200 dark:border-default-500 data-\[open\=true\]\:border-default-800 data-\[focus\=true\]\:border-default-700',
      }}
      label="Ordenar"
      selectedKeys={value}
      size="sm"
      startContent={
        <ArrowDownWideNarrow className="text-default-500" size={15} />
      }
      variant="bordered"
      onSelectionChange={onChange}
    >
      <SelectItem key="createdAt">Mas recientes</SelectItem>
      <SelectItem key="difficult">Por dificultad</SelectItem>
      <SelectItem key="title">Alfabéticamente</SelectItem>
    </Select>
  )
}

export default OrderDropdown
