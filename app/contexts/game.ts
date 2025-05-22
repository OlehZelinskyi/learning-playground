import { createContext, Dispatch } from "react";
import { TURN, WINNING_COMBINATIONS } from "../constants";

export type Move = { turn: keyof typeof TURN; fieldId: number };
export type Moves = Record<keyof typeof TURN, number[]>;

const GameContext = createContext<{
  turn: keyof typeof TURN;
  setTurn: Dispatch<React.SetStateAction<keyof typeof TURN>>;
  changeTurn: VoidFunction;
  winner: keyof typeof TURN | null;
  setWinner: Dispatch<React.SetStateAction<keyof typeof TURN | null>>;
  recordMove: (move: Move) => void;
  moves: Moves;
  winningCombination: typeof WINNING_COMBINATIONS[number] | null;
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
  winningCombination: null
});


export default GameContext;
export const GameProvider = GameContext.Provider;
