import { NextResponse } from 'next/server'

import { CreateGameSchema } from '@schemas/game'
import { insertGame } from '@queries/game'
import mongooseConnect from '@lib/db'

export async function POST(req: Request) {
  try {
    await mongooseConnect()
    const body = await req.json()

    const result = CreateGameSchema.safeParse(body)

    if (!result.success)
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      )

    const game = await insertGame(result.data)

    return NextResponse.json(game, { status: 201 })
  } catch (e) {
    console.error(e)

    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
