import mongoose, { type Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

import { type IUser } from '@/types/user'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
  }

  next()
})

export default (mongoose.models.users as Model<IUser>) ||
  mongoose.model<IUser>('users', userSchema)
