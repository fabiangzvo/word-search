import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { gameId, username } = await request.json()

  // Forward the player join event to the game-updates route
  await fetch(`${request.nextUrl.origin}/api/game-updates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'playerJoin', gameId, username }),
  })

  return NextResponse.json({ message: 'Player joined' })
}
