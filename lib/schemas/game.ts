import { z } from 'zod'

import { ObjectIdSchema } from './common'

export const CreateGameSchema = z.object({
  puzzle: ObjectIdSchema,
  owner: ObjectIdSchema,
})


export type CreateGame = z.infer<typeof CreateGameSchema>