"use client";
import { useCallback, useEffect, useState } from "react";
import Board from "./components/board";
import { TURN, WINNING_COMBINATIONS } from "./constants";
import { GameProvider, Move, Moves } from "./contexts/game";
import Info from "./components/info";



const initialMoves = { [TURN.X]: [], [TURN.O]: [] }

export default function Home() {
  const [turn, setTurn] = useState<keyof typeof TURN>(TURN.X);
  const [winner, setWinner] = useState<keyof typeof TURN | "Deuce" | null>(null);
  const [winningCombination, setWinningCombination] = useState<typeof WINNING_COMBINATIONS[number] | null>(null);
  const [moves, setMoves] = useState<Moves>(initialMoves);

  const isDeuce = useCallback(() => moves[TURN.X].length + moves[TURN.O].length === 9, [moves])

  useEffect(() => {
    const checkWinner = (player: keyof typeof TURN) => {
      const playerMoves = moves[player];

      if (isDeuce()) {
        setWinner("Deuce")
      } else {
        for (const combination of WINNING_COMBINATIONS) {
          if (new Set(playerMoves).isSupersetOf(new Set(combination))) {
            setWinner(player);
            setWinningCombination(combination);
          }
        }
      }


    }

    checkWinner(TURN.X);
    checkWinner(TURN.O);

  }, [moves, isDeuce]);

  const recordMove = (move: Move) => {
    setMoves((prev) => ({
      ...prev,
      [move.turn]: [...prev[move.turn], move.fieldId],
    }));
  };

  const changeTurn = () => {
    setTurn((prev) => (prev === TURN.X ? TURN.O : TURN.X));
  };

  const restart = () => {
    setTurn(TURN.X);
    setWinner(null);
    setWinningCombination(null);
    setMoves(initialMoves)
  }

  const getPlayerByFieldId = (fieldId: number) => {
    let player = null;

    if (moves[TURN.X].includes(fieldId)) {
      player = TURN.X;
    }

    if (moves[TURN.O].includes(fieldId)) {
      player = TURN.O
    }

    return player;
  }


  return (
    <main>
      <GameProvider
        value={{
          turn,
          setTurn,
          changeTurn,
          winner,
          setWinner,
          recordMove,
          moves,
          winningCombination,
          isDeuce,
          restart,
          getPlayerByFieldId
        }}
      >
        <Board />
        <Info />
      </GameProvider>
    </main>
  );
}
