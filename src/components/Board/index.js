import Button from "../Button";
import React from "react";
import { useBoard } from "./useBoard";

function Board() {
  const { selectItem, shuffle, list, winning } = useBoard();
  return (
    <>
      <div className={`plate ${winning ? "winning" : ""}`}>
        {list.map((item, index) => {
          return (
            <Button
              onClick={(deselect) =>
                selectItem({ index, name: item }, deselect)
              }
              item={item}
              key={`${item}-${index}`}
            />
          );
        })}
      </div>
      <button type="button" onClick={shuffle} className="restart">
        Restart The Game
      </button>
    </>
  );
}
export default Board;
