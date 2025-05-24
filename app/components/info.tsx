import { useContext } from "react";
import GameContext from "../contexts/game";

export default function Info() {
  const { winner, restart } = useContext(GameContext);

  return (
    <section>
      <h1>Game Details</h1>
      <p>Winner: {winner}</p>
      {winner && (<button className="bg-blue-600 px-4 py-2" onClick={restart}>Play again</button>)}
    </section>
  );
}
