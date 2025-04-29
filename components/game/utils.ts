import { Action, Actions, GameReducer } from "./types";

export function puzzleReducer(state: GameReducer, action: Action): GameReducer {
  switch (action.type) {
    case Actions.ADD_USER:
      return {
        ...state,
        users: [...state.users.filter(user => user._id !== action.payload.user._id), action.payload.user]
      };
    case Actions.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload.userId)
      };
    case Actions.ADD_WINNER:
      return { ...state, winner: action.payload };
    case Actions.SET_STARTED_AT:
      return { ...state, startedAt: action.payload };
    case Actions.SET_FINISHED_AT:
      return { ...state, finishedAt: action.payload };
    case Actions.ADD_RESPONSE:
      return {
        ...state,
        responses: [...state.responses, action.payload]
      };
    default:
      return state;
  }
};