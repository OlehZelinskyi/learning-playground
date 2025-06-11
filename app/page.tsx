"use client";
import { useCallback, useEffect, useState } from "react";
import Board from "./components/board";
import { TURN, WINNING_COMBINATIONS } from "./constants";
import { GameProvider, Move, Moves } from "./contexts/game";
import Info from "./components/info";

const initialMoves = { [TURN.X]: [], [TURN.O]: [] };

export default function Home() {
  const [turn, setTurn] = useState<keyof typeof TURN>(TURN.X);
  const [winner, setWinner] = useState<keyof typeof TURN | "Deuce" | null>(
    null
  );
  const [winningCombination, setWinningCombination] = useState<
    (typeof WINNING_COMBINATIONS)[number] | null
  >(null);
  const [moves, setMoves] = useState<Moves>(initialMoves);
  const [history, setHistory] = useState<Move[]>([]);

  const isDeuce = useCallback(
    () => moves[TURN.X].length + moves[TURN.O].length === 9,
    [moves]
  );

  useEffect(() => {
    let winner: string;

    const checkWinner = (player: keyof typeof TURN) => {
      const playerMoves = moves[player];

      for (const combination of WINNING_COMBINATIONS) {
        if (new Set(playerMoves).isSupersetOf(new Set(combination))) {
          winner = player;

          setWinner(player);
          setWinningCombination(combination);
        }
      }

      if (!winner && isDeuce()) {
        setWinner("Deuce");
      }
    };

    checkWinner(TURN.X);
    checkWinner(TURN.O);
  }, [moves, isDeuce]);

  const recordMove = (move: Move) => {
    setMoves((prev) => ({
      ...prev,
      [move.turn]: [...prev[move.turn], move.fieldId],
    }));
    setHistory((prev) => [...prev, move]);
  };

  const changeTurn = () => {
    setTurn((prev) => (prev === TURN.X ? TURN.O : TURN.X));
  };

  const restart = () => {
    setTurn(TURN.X);
    setWinner(null);
    setWinningCombination(null);
    setMoves(initialMoves);
    setHistory([]);
  };

  const getPlayerByFieldId = (fieldId: number) => {
    let player = null;

    if (moves[TURN.X].includes(fieldId)) {
      player = TURN.X;
    }

    if (moves[TURN.O].includes(fieldId)) {
      player = TURN.O;
    }

    return player;
  };

  const goTo = (move: Move) => {
    setWinner(null);
    setTurn(move.turn === TURN.X ? TURN.O : TURN.X);

    // Rollback history
    setHistory((prev) => {
      const goToIndex = prev.findIndex(
        (record) => record.fieldId === move.fieldId
      );

      const newHistory = prev.slice(0, goToIndex + 1);

      return newHistory;
    });

    // Rollback moves
    setMoves((prev) => {
      const goToIndex = prev[move.turn].findIndex(
        (fieldId) => fieldId === move.fieldId
      );

      if (move.turn === TURN.O) {
        return {
          [TURN.X]: prev.X.slice(0, goToIndex + 1),
          [TURN.O]: prev.O.slice(0, goToIndex + 1),
        };
      }

      return {
        [TURN.X]: prev.X.slice(0, goToIndex + 1),
        [TURN.O]: prev.O.slice(0, goToIndex),
      };
    });
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
          winningCombination,
          isDeuce,
          restart,
          getPlayerByFieldId,
          history,
          goTo,
        }}
      >
        <Board />
        <Info />
      </GameProvider>
    </main>
  );
}
