import {
  FilterQuery,
  ProjectionFields,
  Document,
  Types,
  QueryOptions,
} from 'mongoose'

import { PaginateResult } from '@utils/paginate'

import { ICategoryDetail } from './category'
import { IUserDetail } from './user'

export interface Question {
  label: string
  answer: string
  _id: string
}

export type Difficult = 'easy' | 'medium' | 'hard'

export interface IPuzzle extends Document {
  title: string
  difficult: Difficult
  cols: number
  questions: Question[]
  matrix: string[][]
  isPublic: boolean
  owner: Types.ObjectId
  categories: Types.ObjectId[]
}

export type InsertPuzzle = Pick<
  IPuzzle,
  | 'title'
  | 'questions'
  | 'matrix'
  | 'isPublic'
  | 'owner'
  | 'categories'
  | 'difficult'
  | 'cols'
>

export interface GetPuzzle {
  filters?: FilterQuery<IPuzzle>
  projection?: ProjectionFields<IPuzzle>
  options?: QueryOptions<IPuzzle>
}

export interface PaginatePuzzle {
  owner: string
  page: number
  pageSize: number
  title?: string
  projection?: ProjectionFields<IPuzzle>
}

export interface PaginatePuzzleResponse<T> extends PaginateResult<T> {
  pages: number
}

export interface IPuzzleClient {
  _id: string
  title: string
  difficult: Difficult
  cols: number
  questions: Question[]
  matrix: string[][]
  isPublic: boolean
  owner: string
  categories: string[]
}

export interface IPuzzleItem {
  _id: string
  title: string
  difficult: Difficult
  cols?: number
  questionCount: number
  isPublic: boolean
  categories: ICategoryDetail[]
}

export interface IPuzzleDetail {
  _id: string
  title: string
  difficult: Difficult
  cols: number
  questions: Question[]
  matrix: string[][]
  isPublic: boolean
  owner: IUserDetail
  categories: ICategoryDetail[]
}
