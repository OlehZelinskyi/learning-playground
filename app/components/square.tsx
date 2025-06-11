import { use, useState } from "react";
import XSign from "./xsign";
import OSign from "./osign";
import { TURN } from "../constants";
import GameContext from "../contexts/game";
import clsx from "clsx";

const CONTENT_MAP = {
  [TURN.X]: <XSign />,
  [TURN.O]: <OSign />,
};

export default function Square({ fieldId }: { fieldId: number }) {
  const [value, setValue] = useState<keyof typeof TURN>();

  const {
    turn,
    changeTurn,
    recordMove,
    winner,
    winningCombination,
    getPlayerByFieldId,
  } = use(GameContext);

  const handleClick = () => {
    if (!content && !winner) {
      setValue(turn);
      recordMove({ turn, fieldId });
      changeTurn();
    }
  };

  const isWinnerCell =
    winner &&
    value === winner &&
    winningCombination?.includes(fieldId as never);
  const isDeuceCell = winner === "Deuce";
  const player = getPlayerByFieldId(fieldId);
  const content = player ? CONTENT_MAP[player] : null;

  return (
    <button
      data-fieldid={fieldId}
      className={clsx(
        "w-10 h-10 border border-gray-500 text-gray-500",
        isWinnerCell && "bg-green-800 text-white",
        isDeuceCell && "bg-yellow-500 text-white"
      )}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
