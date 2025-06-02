'use client'

import { Fragment, JSX, useReducer, useCallback, ChangeEvent } from 'react'
import useInfinitySWR from 'swr/infinite'
import { FilterX } from 'lucide-react'
import { Tooltip } from '@heroui/tooltip'
import { Button } from '@heroui/button'

import PuzzleList from '@components/puzzleList'
import SearchInput from '@components/searchInput'
import { reducer } from '@utils/reducer'
import { getPaginatePuzzle } from '@lib/queries/puzzle'
import type { IPuzzleItem, PaginatePuzzleResponse } from '@/types/puzzle'

import type { Filters } from './types'
import DifficultDropdown from './components/difficultDropdown'
import OrderDropdown from './components/orderDropdown'

interface FilterFetcher extends Filters {
  page: number
}

async function fetcher(
  params: FilterFetcher
): Promise<PaginatePuzzleResponse<IPuzzleItem>> {
  const filters: Partial<IPuzzleItem> = { isPublic: true }

  if (params.title) filters.title = params.title
  if (params.difficult) filters.difficult = params.difficult

  return getPaginatePuzzle<IPuzzleItem>({
    filters,
    projection: {
      questionsCount: { $size: '$questions' },
      title: true,
      difficult: true,
      isPublic: true,
      _id: { $toString: '$_id' },
      categories: {
        $map: {
          input: '$categories',
          as: 'category',
          in: { _id: { $toString: '$$category._id' }, name: '$$category.name' },
        },
      },
      cols: true,
      description: true,
    },
    page: params.page,
    pageSize: 5,
    orderBy: params.order,
  })
}

function Explore(): JSX.Element {
  const [state, dispatch] = useReducer(reducer<Filters>, {
    title: '',
    category: '',
    difficult: undefined,
    order: 'createdAt',
  })

  const { data = [], isLoading } = useInfinitySWR(
    (page) => ({ ...state, page: page + 1 }),
    fetcher,
    {
      fallbackData: [{ data: [], total: 0, pages: 0 }],
    }
  )

  const handleSelectDifficult = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target

      if (state.difficult === value || !value) {
        dispatch({
          type: 'SET',
          payload: { key: 'difficult', value: '' },
        })

        return
      }

      dispatch({
        type: 'SET',
        payload: { key: 'difficult', value },
      })
    },
    [state.difficult]
  )

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <SearchInput
          handleSearch={(value) =>
            dispatch({ type: 'SET', payload: { key: 'title', value } })
          }
          variant="bordered"
        />
        <div className="flex justify-center gap-4 items-center px-6 max-md:flex-col max-md:px-0">
          <DifficultDropdown
            value={state.difficult ? [state.difficult] : []}
            onChange={handleSelectDifficult}
          />
          <OrderDropdown
            value={[state.order]}
            onChange={(value) =>
              value.currentKey &&
              dispatch({
                type: 'SET',
                payload: { key: 'order', value: value.currentKey },
              })
            }
          />
          <Tooltip content="Eliminar filtros">
            <Button
              isIconOnly
              color="danger"
              variant="light"
              onPress={() => {
                dispatch({
                  type: 'SET',
                  payload: { key: 'category', value: '' },
                })
                dispatch({
                  type: 'SET',
                  payload: { key: 'title', value: '' },
                })
                dispatch({
                  type: 'SET',
                  payload: { key: 'difficult', value: '' },
                })
                dispatch({
                  type: 'SET',
                  payload: { key: 'order', value: 'createdAt' },
                })
              }}
            >
              <FilterX />
            </Button>
          </Tooltip>
        </div>
      </div>
      <p className="my-6 text-center">
        Mostrando {data[0]?.data.length} de {data[0]?.total} resultados
      </p>
      <PuzzleList
        hideOptions
        isLoading={isLoading}
        puzzles={data[0]?.data || []}
      />
    </Fragment>
  )
}

export default Explore
