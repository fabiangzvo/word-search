'use client'

import { JSX, useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Tooltip,
  Button,
} from '@heroui/react'
import { Trash2, Lock, LockOpen, PenLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'
import ConfirmDialog from '@components/confirmDialog'
import { removePuzzle } from '@lib/queries/puzzle'
import { updateVisibility } from '@lib/actions/puzzle'

import EmptyContent from './components/emptyContent'

import { INotification } from '@/types/notification'
import { type IPuzzleItem } from '@/types/puzzle'

interface PuzzleTableProps {
  puzzles: IPuzzleItem[]
  hideOptions?: boolean
}

function PuzzleTable({ puzzles }: PuzzleTableProps): JSX.Element {
  const router = useRouter()

  const handleDelete = useCallback(
    async (puzzleId: string) => {
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
    },
    [router]
  )

  const handleVisibility = useCallback(
    async (puzzleId: string, isPublic: boolean) => {
      const notification: INotification = {
        message: '',
        settings: {
          type: 'success',
        },
      }

      try {
        const isUpdated = await updateVisibility(puzzleId, isPublic)

        if (!isUpdated) throw new Error('puzzle not updated')

        notification.message = `Se ha ${isPublic ? 'publicado' : 'despublicado'} la sopa de letras.`
      } catch (e) {
        console.error(e)

        notification.message = `No se ha podido ${isPublic ? 'publicar' : 'despublicar'} la sopa de letras.`
        notification.settings.type = 'error'
      }

      router.refresh()
      toast(notification.message, notification.settings)
    },
    []
  )

  const renderCell = useCallback(
    (puzzle: IPuzzleItem, columnKey: string | number) => {
      const cellValue = getKeyValue(puzzle, columnKey)

      switch (columnKey) {
        case 'title':
          return (
            <Link
              className="text-foreground hover:underline"
              href={`/puzzle/${puzzle._id}`}
            >
              {cellValue}
            </Link>
          )
        case 'isPublic':
          return (
            <Chip
              color={cellValue ? 'primary' : 'warning'}
              size="sm"
              variant="flat"
            >
              <p className="font-semibold">
                {cellValue ? 'Pública' : 'Privada'}
              </p>
            </Chip>
          )
        case 'actions':
          const isPublic = getKeyValue(puzzle, 'isPublic') || false

          return (
            <div className="flex items-center gap-2">
              <Tooltip content={isPublic ? 'Despublicar' : 'Publicar'}>
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onPress={() => handleVisibility(puzzle?._id, !isPublic)}
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
                  href={`/puzzle/${puzzle?._id}/edit`}
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
                handleConfirm={() => handleDelete(puzzle?._id)}
                title={puzzle?.title}
                tooltip="Eliminar"
                variant="light"
              />
            </div>
          )
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <Table
      classNames={{ th: 'bg-transparent text-foreground font-bold text-base' }}
      hideHeader={puzzles.length <= 0}
      shadow="none"
    >
      <TableHeader>
        <TableColumn key="title">Nombre</TableColumn>
        <TableColumn key="questionsCount">Preguntas</TableColumn>
        <TableColumn key="difficult">Dificultad</TableColumn>
        <TableColumn key="isPublic">Estado</TableColumn>
        <TableColumn key="actions">Acciones</TableColumn>
      </TableHeader>
      <TableBody emptyContent={<EmptyContent />} items={puzzles ?? []}>
        {(item: IPuzzleItem) => (
          <TableRow key={item?._id}>
            {(columnKey) => (
              <TableCell className="border-b dark:border-neutral-700">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default PuzzleTable
