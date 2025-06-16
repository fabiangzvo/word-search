import { useCallback, useState, type JSX } from 'react'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Plus } from 'lucide-react'

import { DialogFormButton } from '@components/dialogFormButton'

import { CategoryFormProps } from './types'

export function CategoryForm({ addCategory }: CategoryFormProps): JSX.Element {
  const [value, setValue] = useState({ opeModal: false, category: '', isInvalid: false })

  const handleClick = useCallback(
    () => {
      if (value.category.length <= 2) {
        setValue((prev) => ({ ...prev, isInvalid: true }))

        return
      }
      console.log(value.category)
      addCategory(value.category)

      setValue({ category: '', opeModal: false, isInvalid: false })
    },
    [addCategory, value.category]
  )

  return (
    <DialogFormButton
      buttonLabel={<Plus />}
      color="primary"
      isOpen={value.opeModal}
      isIcon
      title="Nueva categoria"
      tooltip="Agregar categoria"
      variant="solid"
      onOpen={() => setValue(prev => ({ ...prev, opeModal: true }))}
      onOpenChange={() => setValue({ opeModal: false, category: '', isInvalid: false })}
    >
      <Input
        isInvalid={value.isInvalid}
        className='my-6'
        isRequired
        errorMessage="Este campo es obligatorio y debe tener al menos 3 caracteres"
        label="Nombre"
        labelPlacement="outside"
        minLength={3}
        name="name"
        placeholder="Escribe la categoria"
        variant="bordered"
        value={value.category}
        onChange={(e) => setValue({ ...value, category: e.target.value })}
      />
      <div className='flex justify-end'>
        <Button color="primary" onPress={handleClick} variant="solid">
          Agregar
        </Button>
      </div>
    </DialogFormButton>
  )
}
