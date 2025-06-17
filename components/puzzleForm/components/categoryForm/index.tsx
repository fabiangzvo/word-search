import { useCallback, useState, type JSX } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Plus } from 'lucide-react'

import { DialogFormButton } from '@components/dialogFormButton'

import { CategoryFormProps } from './types'

export function CategoryForm({ addCategory }: CategoryFormProps): JSX.Element {
  const [value, setValue] = useState({
    opeModal: false,
    category: '',
    isInvalid: false,
  })

  const handleClick = useCallback(() => {
    if (value.category.length <= 2) {
      setValue((prev) => ({ ...prev, isInvalid: true }))

      return
    }

    addCategory(value.category)

    setValue({ category: '', opeModal: false, isInvalid: false })
  }, [addCategory, value.category])

  return (
    <DialogFormButton
      isIcon
      buttonLabel={<Plus />}
      color="primary"
      isOpen={value.opeModal}
      title="Nueva categoria"
      tooltip="Agregar categoria"
      variant="solid"
      onOpen={() => setValue((prev) => ({ ...prev, opeModal: true }))}
      onOpenChange={() =>
        setValue({ opeModal: false, category: '', isInvalid: false })
      }
    >
      <Input
        isRequired
        className="my-6"
        errorMessage="Este campo es obligatorio y debe tener al menos 3 caracteres"
        isInvalid={value.isInvalid}
        label="Nombre"
        labelPlacement="outside"
        minLength={3}
        name="name"
        placeholder="Escribe la categoria"
        value={value.category}
        variant="bordered"
        onChange={(e) => setValue({ ...value, category: e.target.value })}
      />
      <div className="flex justify-end">
        <Button color="primary" variant="solid" onPress={handleClick}>
          Agregar
        </Button>
      </div>
    </DialogFormButton>
  )
}
