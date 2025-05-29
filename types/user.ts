import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  username: string
}

export interface IUserDetail {
  _id: string
  name: string
  email: string
}

export interface IUserActive {
  user: IUserDetail
  color: number
}
