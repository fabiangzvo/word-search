import mongoose from "mongoose";

declare global {
  var mongoose: mongoose;
  var gameStates: {
    [gameId: string]: {
      activePlayers: { username: string; lastActive: number }[];
    };
  };
}
