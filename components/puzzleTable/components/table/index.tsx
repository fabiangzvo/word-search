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
  Spinner,
  Pagination,
} from '@heroui/react'
import Link from 'next/link'

import EmptyContent from '../emptyContent'
import Actions from '../actions'

import { DifficultEnum, type IPuzzleItem } from '@/types/puzzle'

interface TableComponentProps {
  puzzles: IPuzzleItem[]
  hideOptions?: boolean
  isLoading: boolean
  totalPages: number
  page: number
  handlePage: (page: number) => void
  refreshData: () => void
}

function TableComponent(props: TableComponentProps): JSX.Element {
  const { puzzles, isLoading, handlePage, page, totalPages, refreshData } =
    props

  const renderCell = useCallback(
    (puzzle: IPuzzleItem, columnKey: string | number) => {
      const cellValue = getKeyValue(puzzle, columnKey)

      switch (columnKey) {
        case 'title':
          return (
            <Link
              className="text-foreground hover:underline"
              href={`/puzzle/${puzzle._id}/detail`}
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
          return (
            <Actions
              isPublic={getKeyValue(puzzle, 'isPublic') || false}
              puzzleId={puzzle._id}
              refreshData={refreshData}
              title={puzzle.title}
            />
          )
        case 'difficult':
          return DifficultEnum[cellValue as keyof typeof DifficultEnum]
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <Table
      bottomContent={
        !isLoading &&
        puzzles.length > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              showControls
              classNames={{
                item: 'dark:bg-opacity-20 dark:[&[data-hover=true]]:bg-opacity-10',
                next: 'dark:bg-opacity-20 dark:[&[data-hover=true]]:bg-opacity-10 dark:data-[disabled=true]:bg-opacity-60',
                prev: 'dark:bg-opacity-20 dark:[&[data-hover=true]]:bg-opacity-10 dark:data-[disabled=true]:bg-opacity-60',
              }}
              page={page}
              total={totalPages}
              onChange={handlePage}
            />
          </div>
        )
      }
      classNames={{
        th: 'bg-transparent text-foreground font-bold text-base',
      }}
      hideHeader={puzzles.length <= 0}
      shadow="none"
    >
      <TableHeader
        columns={[
          { key: 'title', label: 'Nombre' },
          { key: 'questionsCount', label: 'Preguntas' },
          { key: 'difficult', label: 'Dificultad' },
          { key: 'isPublic', label: 'Estado' },
          { key: 'actions', label: 'Acciones' },
        ]}
      >
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={<EmptyContent />}
        isLoading={isLoading}
        items={puzzles ?? []}
        loadingContent={<Spinner label="Cargando..." />}
      >
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

export default TableComponent
