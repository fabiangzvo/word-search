import { type NextRequest, NextResponse } from 'next/server'
import User from '@lib/models/user'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({ email }).exec()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    await new User({
      email,
      password,
      name,
    }).save()

    return NextResponse.json({ message: 'User created successfully' })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
