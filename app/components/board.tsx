import Square from "./square";

export default function Board() {
  const fields = new Array(9).fill(null).map((_, index) => {
    return <Square key={index} fieldId={index} />;
  });

  return (
    <section className="grid grid-cols-3 grid-rows-3 w-fit">{fields}</section>
  );
}
