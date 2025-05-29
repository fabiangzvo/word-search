'use server'

import { FilterQuery } from 'mongoose'

import User from '@models/user'
import { IUser } from '@/types/user'

export async function userExist(filter: FilterQuery<IUser>): Promise<boolean> {
  const user = await User.findOne(filter).catch(() => null)

  return !user
}
