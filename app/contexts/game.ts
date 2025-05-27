import { createContext, Dispatch } from "react";
import { TURN, WINNING_COMBINATIONS } from "../constants";

export type Move = { turn: keyof typeof TURN; fieldId: number };
export type Moves = Record<keyof typeof TURN, number[]>;

const GameContext = createContext<{
  turn: keyof typeof TURN;
  setTurn: Dispatch<React.SetStateAction<keyof typeof TURN>>;
  changeTurn: VoidFunction;
  winner: keyof typeof TURN | "Deuce" | null;
  setWinner: Dispatch<React.SetStateAction<keyof typeof TURN | "Deuce" | null>>;
  recordMove: (move: Move) => void;
  moves: Moves;
  winningCombination: typeof WINNING_COMBINATIONS[number] | null;
  isDeuce: () => boolean;
  restart: () => void;
  getPlayerByFieldId: (id: number) => keyof typeof TURN | null;
  history: Move[],
  goTo: (move: Move) => void;
}>({
  turn: TURN.X,
  setTurn: () => {
    throw new Error("setTurn function not implemented");
  },
  changeTurn: () => {
    throw new Error("changeTurn function not implemented");
  },
  winner: null,
  setWinner: () => {
    throw new Error("setWinner function not implemented");
  },
  recordMove: () => {
    throw new Error("recordMove function not implemented");
  },
  moves: { [TURN.X]: [], [TURN.O]: [] },
  winningCombination: null,
  isDeuce: () => {
    throw Error("isDeuce function not implemented")
  },
  restart: () => {
    throw Error("restart function not implemented")
  },
  getPlayerByFieldId: () => {
    throw Error("getPlayerByFieldId function not implemented")
  },
  goTo: () => {
    throw Error("goTo function not implemented")
  },
  history: []
});


export default GameContext;
export const GameProvider = GameContext.Provider;
