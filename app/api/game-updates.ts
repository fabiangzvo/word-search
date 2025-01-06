import { type NextApiRequest, type NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  const gameId = req.query.gameId as string

  const sendUpdate = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // Store the sendUpdate function for this connection
  if (!global.gameConnections) {
    global.gameConnections = {}
  }
  if (!global.gameConnections[gameId]) {
    global.gameConnections[gameId] = []
  }
  global.gameConnections[gameId].push(sendUpdate)

  // Remove the connection when the client disconnects
  req.on('close', () => {
    global.gameConnections[gameId] = global.gameConnections[gameId].filter(
      (connection: any) => connection !== sendUpdate
    )
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
