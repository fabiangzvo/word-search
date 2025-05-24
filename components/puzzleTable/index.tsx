'use client'

import { JSX, useReducer, useCallback } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import useSWR from 'swr'

import SearchInput from '@components/searchInput'
import { reducer } from '@utils/reducer'
import { getPaginatePuzzle } from '@lib/queries/puzzle'
import { IPuzzleItem, PaginatePuzzleResponse } from '@/types/puzzle'

import type { PuzzleTableProps, SearchState } from './types'
import Table from './components/table'

async function fetcher(
  params: SearchState & { owner: string }
): Promise<PaginatePuzzleResponse<IPuzzleItem>> {
  if (!params.owner) return { data: [], total: 0, pages: 0 }

  return getPaginatePuzzle<IPuzzleItem>({
    owner: params.owner,
    title: params.search,
    projection: {
      questionsCount: { $size: '$questions' },
      title: true,
      difficult: true,
      isPublic: true,
      _id: { $toString: '$_id' },
    },
    page: params.page,
    pageSize: 5,
  })
}

function PuzzleTable({ userId }: PuzzleTableProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer<SearchState>, {
    page: 1,
    search: '',
  })

  const {
    data: { data, pages },
    isLoading,
  } = useSWR({ ...state, owner: userId }, fetcher, {
    fallbackData: { data: [], total: 0, pages: 0 },
  })

  const handleSubmit = useCallback((value: string) => {
    dispatch({ type: 'SET', payload: { key: 'search', value } })
    dispatch({ type: 'SET', payload: { key: 'page', value: 1 } })
  }, [])

  const handlePage = useCallback((value: number) => {
    dispatch({ type: 'SET', payload: { key: 'page', value } })
  }, [])

  return (
    <Card>
      <CardHeader className="grid grid-cols-2 px-6 pt-6">
        <h2 className="text-lg font-medium">Tus sopas de letras</h2>
        <SearchInput variant="bordered" handleSearch={handleSubmit} />
      </CardHeader>
      <CardBody>
        <Table
          puzzles={data}
          isLoading={isLoading}
          totalPages={pages}
          page={state.page}
          handlePage={handlePage}
        />
      </CardBody>
    </Card>
  )
}

export default PuzzleTable
