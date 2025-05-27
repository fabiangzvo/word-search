
import { JSX, useCallback } from 'react'
import { Trash2, Lock, LockOpen, PenLine } from 'lucide-react'
import { toast } from 'react-toastify'
import { Tooltip } from '@heroui/tooltip'
import { Button } from '@heroui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ConfirmDialog from '@components/confirmDialog'
import { removePuzzle } from '@lib/queries/puzzle'
import { updateVisibility } from '@lib/actions/puzzle'
import { INotification } from '@/types/notification'

import type { ActionProps } from './types'

function Actions(props: ActionProps): JSX.Element {
  const { isPublic, puzzleId, title, refreshData } = props

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

    refreshData()
    router.refresh()

    toast(notification.message, notification.settings)
  }, [refreshData, router])

  const handleVisibility = useCallback(async () => {
    const notification: INotification = {
      message: '',
      settings: {
        type: 'success',
      },
    }

    try {
      const isUpdated = await updateVisibility(puzzleId, !isPublic)

      if (!isUpdated) throw new Error('puzzle not updated')

      notification.message = `Se ha ${!isPublic ? 'publicado' : 'despublicado'} la sopa de letras.`
    } catch (e) {
      console.error(e)

      notification.message = `No se ha podido ${!isPublic ? 'publicar' : 'despublicar'} la sopa de letras.`
      notification.settings.type = 'error'
    }

    refreshData()
    router.refresh()

    toast(notification.message, notification.settings)
  }, [puzzleId, isPublic, refreshData, router])

  return (
    <div className="flex items-center gap-2">
      <Tooltip content={isPublic ? 'Despublicar' : 'Publicar'}>
        <Button
          isIconOnly
          color="primary"
          variant="light"
          onPress={handleVisibility}
        >
          {isPublic ? (
            <Lock className="text-default-600" size={20} />
          ) : (
            <LockOpen className="text-default-400" size={20} />
          )}
        </Button>
      </Tooltip>
      <Tooltip content="Editar">
        <Button
          isIconOnly
          as={Link}
          color="warning"
          href={`/puzzle/${puzzleId}/edit`}
          variant="light"
        >
          <PenLine size={20} />
        </Button>
      </Tooltip>
      <ConfirmDialog
        buttonLabel={<Trash2 size={20} />}
        color="danger"
        confirmColor="danger"
        confirmLabel="Eliminar"
        confirmVariant="solid"
        description="¿Estás seguro de que deseas eliminar esta sopa de letras?"
        handleConfirm={handleDelete}
        title={title}
        tooltip="Eliminar"
        variant="light"
      />
    </div>
  )
}

export default Actions
