'use client'

import { JSX, useReducer, useCallback } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import useSWR from 'swr'

import SearchInput from '@components/searchInput'
import { reducer } from '@utils/reducer'
import { getPaginatePuzzle } from '@lib/queries/puzzle'
import { IPuzzleItem, PaginatePuzzleResponse } from '@/types/puzzle'

import Table from './components/table'
import type { PuzzleTableProps, SearchState } from './types'

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
    mutate,
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
    <Card className="mb-8">
      <CardHeader className="grid grid-cols-2 px-6 pt-6 max-md:grid-cols-1 max-md:gap-y-6">
        <h2 className="text-lg font-semibold max-md:text-center">
          Tus sopas de letras
        </h2>
        <SearchInput handleSearch={handleSubmit} variant="bordered" />
      </CardHeader>
      <CardBody>
        <Table
          handlePage={handlePage}
          isLoading={isLoading}
          page={state.page}
          puzzles={data}
          refreshData={mutate}
          totalPages={pages}
        />
      </CardBody>
    </Card>
  )
}

export default PuzzleTable
