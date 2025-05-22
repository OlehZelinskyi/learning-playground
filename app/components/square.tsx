import { JSX, useContext, useState } from "react";
import XSign from "./xsign";
import OSign from "./osign";
import { TURN } from "../constants";
import GameContext from "../contexts/game";
import clsx from "clsx";

export default function Square({ fieldId }: { fieldId: number }) {
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [value, setValue] = useState<keyof typeof TURN>()


  const { turn, changeTurn, recordMove, winner, winningCombination } = useContext(GameContext);

  const handleClick = () => {
    if (!content && !winner) {
      setContent(turn === TURN.X ? <XSign /> : <OSign />);
      setValue(turn);
      recordMove({ turn, fieldId });
      changeTurn();
    }
  };

  const isWinnerCell = winner && value === winner && winningCombination?.includes(fieldId as never);

  return (
    <button
      data-fieldid={fieldId}
      className={clsx("w-10 h-10 border border-gray-500 text-gray-500", isWinnerCell && "bg-green-800 text-white")}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
