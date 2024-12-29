import { NextRequest, NextResponse } from "next/server";

// Define a global variable to store game states
declare global {
  var gameStates: {
    [gameId: string]: {
      playerScores: { username: string; score: number }[];
      foundWords: string[];
      foundCells: number[][];
      activePlayers: { username: string; lastActive: number }[];
    };
  };
  var gameConnections: {
    [gameId: string]: ((data: any) => void)[];
  };
}

if (typeof global.gameStates === "undefined") {
  global.gameStates = {};
}
if (typeof global.gameConnections === "undefined") {
  global.gameConnections = {};
}

export async function GET(request: NextRequest) {
  const gameId = request.nextUrl.searchParams.get("gameId");

  if (!gameId) {
    return new NextResponse("Game ID is required", { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const sendUpdate = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      if (!global.gameConnections[gameId]) {
        global.gameConnections[gameId] = [];
      }
      global.gameConnections[gameId].push(sendUpdate);

      if (!global.gameStates[gameId]) {
        global.gameStates[gameId] = {
          playerScores: [],
          foundWords: [],
          foundCells: [],
          activePlayers: [],
        };
      }

      const gameState = global.gameStates[gameId];
      sendUpdate({
        type: "initialState",
        playerScores: gameState.playerScores || [],
        foundWords: gameState.foundWords || [],
        foundCells: gameState.foundCells || [],
        activePlayers: gameState.activePlayers || [],
      });

      const interval = setInterval(() => {
        sendUpdate({ type: "heartbeat" });
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        global.gameConnections[gameId] = global.gameConnections[gameId].filter(
          (connection) => connection !== sendUpdate
        );
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: NextRequest) {
  const {
    type,
    gameId,
    username,
    word,
    playerScores,
    foundWords,
    foundCells,
    completionTime,
  } = await request.json();

  if (!global.gameStates[gameId]) {
    global.gameStates[gameId] = {
      playerScores: [],
      foundWords: [],
      foundCells: [],
      activePlayers: [],
    };
  }

  const gameState = global.gameStates[gameId];

  if (type === "wordFound") {
    gameState.playerScores = playerScores;
    gameState.foundWords = foundWords;
    gameState.foundCells = foundCells;

    // Broadcast to all clients
    if (global.gameConnections && global.gameConnections[gameId]) {
      global.gameConnections[gameId].forEach((sendUpdate) => {
        sendUpdate({
          type: "wordFound",
          playerScores,
          foundWords,
          foundCells,
          foundBy: username,
        });
      });
    }
  } else if (type === "gameCompleted") {
    const winner = playerScores.reduce((a: any, b: any) =>
      a.score > b.score ? a : b
    ).username;
    gameState.playerScores = playerScores;

    // Broadcast game completion to all clients
    if (global.gameConnections && global.gameConnections[gameId]) {
      global.gameConnections[gameId].forEach((sendUpdate) => {
        sendUpdate({
          type: "gameCompleted",
          winner,
          completionTime,
          playerScores,
        });
      });
    }
  } else if (type === "playerJoin") {
    const newPlayer = { username, lastActive: Date.now() };
    if (!gameState.activePlayers.some((p) => p.username === username)) {
      gameState.activePlayers.push(newPlayer);
    }
    // Broadcast to all clients
    if (global.gameConnections && global.gameConnections[gameId]) {
      global.gameConnections[gameId].forEach((sendUpdate) => {
        sendUpdate({ type: "playerJoin", player: newPlayer });
      });
    }
  } else if (type === "playerLeave") {
    gameState.activePlayers = gameState.activePlayers.filter(
      (p) => p.username !== username
    );
    // Broadcast to all clients
    if (global.gameConnections && global.gameConnections[gameId]) {
      global.gameConnections[gameId].forEach((sendUpdate) => {
        sendUpdate({ type: "playerLeave", username });
      });
    }
  }

  return NextResponse.json({ message: "Update received" });
}
