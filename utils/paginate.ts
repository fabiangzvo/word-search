import { Model, FilterQuery, PipelineStage } from 'mongoose'

export interface PaginateResult<T> {
  data: T[]
  total: number
}

export interface PaginateParams<T> {
  model: Model<T>
  filters: FilterQuery<T>
  page: number
  pageSize: number
  projection?: PipelineStage.Project['$project']
}

export async function paginate<T>(
  params: PaginateParams<T>
): Promise<PaginateResult<T>> {
  const { model, filters, projection, page = 1, pageSize = 10 } = params

  const stages: PipelineStage[] = [
    { $match: filters },
    { $sort: { createdAt: -1 } },
  ]

  if (projection) stages.push({ $project: projection })

  stages.push({
    $facet: {
      data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      total: [{ $count: 'count' }],
    },
  })

  const result = await model.aggregate(stages)

  const data = result[0].data
  const total = result[0].total[0]?.count || 0

  return { data, total }
}
