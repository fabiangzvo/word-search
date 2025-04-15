import { type JSX, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { EllipsisVertical } from 'lucide-react'
import { toast } from 'react-toastify'
import { removePuzzle } from '@queries/puzzle'

import { type INotification } from '@/types/notification'

interface OptionProps {
  puzzleId: string
}

function Options({ puzzleId }: OptionProps): JSX.Element {
  const router = useRouter()

  const handleDelete = useCallback(async () => {
    const notification: INotification = {
      message: 'Sopa de letras eliminada correctamente.',
      settings: {
        type: 'success',
      },
    }

    try {
      const isRemoved = await removePuzzle(puzzleId)

      if (!isRemoved) {
        notification.message =
          'No se encontró la sopa de letras que estás tratando de eliminar.'
        notification.settings.type = 'warning'
      }
    } catch (e) {
      console.error(e)

      notification.message =
        'Ha ocurrido un error y no se ha podido eliminar la sopa de letras.'
      notification.settings.type = 'error'
    }

    router.refresh()
    toast(notification.message, notification.settings)
  }, [puzzleId, router])

  const handleEdit = useCallback(() => {
    router.push(`/puzzle/edit/${puzzleId}`)
  }, [router])

  return (
    <Dropdown>
      <DropdownTrigger>
        <EllipsisVertical className="text-default-500 cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Example with disabled actions"
        color="primary"
        disabledKeys={['status']}
        variant="flat"
      >
        <DropdownItem key="status">Cambiar estado</DropdownItem>
        <DropdownItem key="edit" onPress={handleEdit}>
          Editar
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onPress={handleDelete}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Options
