"use client";
import { useEffect, useState } from "react";
import Board from "./components/board";
import { TURN, WINNING_COMBINATIONS } from "./constants";
import { GameProvider, Move, Moves } from "./contexts/game";



export default function Home() {
  const [turn, setTurn] = useState<keyof typeof TURN>(TURN.X);
  const [winner, setWinner] = useState<keyof typeof TURN | null>(null);
  const [moves, setMoves] = useState<Moves>({ [TURN.X]: [], [TURN.O]: [] });

  useEffect(() => {
    const checkWinner = (player: keyof typeof TURN) => {

      const playerMoves = moves[player];

      for (const combination of WINNING_COMBINATIONS) {
        if (new Set(playerMoves).isSupersetOf(new Set(combination))) {
          setWinner(player);
        }
      }
    }

    checkWinner(TURN.X);
    checkWinner(TURN.O);

  }, [moves,]);

  const recordMove = (move: Move) => {
    setMoves((prev) => ({
      ...prev,
      [move.turn]: [...prev[move.turn], move.fieldId],
    }));
  };

  const changeTurn = () => {
    setTurn((prev) => (prev === TURN.X ? TURN.O : TURN.X));
  };


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
        }}
      >
        <Board />
      </GameProvider>
    </main>
  );
}
