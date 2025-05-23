import { z } from 'zod'
import { Types } from 'mongoose'

export const ObjectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  })
