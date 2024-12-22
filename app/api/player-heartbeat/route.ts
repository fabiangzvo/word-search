import { NextRequest, NextResponse } from "next/server";

declare global {
  var gameStates: {
    [gameId: string]: {
      activePlayers: { username: string; lastActive: number }[];
    };
  };
}

if (typeof global.gameStates === "undefined") {
  global.gameStates = {};
}

export async function POST(request: NextRequest) {
  const { gameId, username } = await request.json();

  if (!global.gameStates[gameId]) {
    global.gameStates[gameId] = { activePlayers: [] };
  }

  const gameState = global.gameStates[gameId];
  const currentTime = Date.now();
  const playerIndex = gameState.activePlayers.findIndex(
    (p) => p.username === username
  );

  if (playerIndex !== -1) {
    gameState.activePlayers[playerIndex].lastActive = currentTime;
  } else {
    gameState.activePlayers.push({ username, lastActive: currentTime });
  }

  // Remove inactive players (inactive for more than 1 minute)
  const inactivePlayers = gameState.activePlayers.filter(
    (p) => currentTime - p.lastActive > 60000
  );
  gameState.activePlayers = gameState.activePlayers.filter(
    (p) => currentTime - p.lastActive <= 60000
  );

  // Notify about player disconnects
  for (const inactivePlayer of inactivePlayers) {
    await fetch(`${request.nextUrl.origin}/api/game-updates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "playerLeave",
        gameId,
        username: inactivePlayer.username,
      }),
    });
  }

  return NextResponse.json({ message: "Heartbeat received" });
}
