import { use } from "react";
import GameContext, { Move } from "../contexts/game";

export default function History() {
  const { history, goTo } = use(GameContext);

  const createMoveToHistoryHandler = (move: Move) => () => {
    goTo(move);
  };

  if (!history.length) return null;

  return (
    <ul>
      {history.map((record, index) => {
        const isLastRecord = index === history.length - 1;

        return (
          <li
            key={index}
            className="cursor-pointer hover:text-blue-500"
            {...(!isLastRecord && {
              onClick: createMoveToHistoryHandler(record),
            })}
          >
            Player {record.turn} played field {record.fieldId}
          </li>
        );
      })}
    </ul>
  );
}
