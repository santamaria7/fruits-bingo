import "./App.scss";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../Button";
import { fruits, randomText } from "../../constants";
import {chooseWord, columnShuffle, diagonalShuffle, multipleShuffle, randomize, rowShuffle} from "../../utils";

function App() {
  const [list, setList] = useState([]);
  const [selectionCount, setSelectionCount] = useState(0);
  const [wrongSelection, setWrongSelection] = useState(0);
  const [winning, setWinning] = useState(false);

  const shuffleMethods = useMemo(() => {
    return {
      0: columnShuffle,
      1: rowShuffle,
      2: diagonalShuffle,
      3: multipleShuffle,
    };
  }, []);

  function fillList(indexArr, repeat) {
    const newList = [];
    let i;
    for (i = 0; i < 25; i++) {
      if (i === 12) {
        // The free slot
        newList[i] = "";
      } else {
        const reference = indexArr.indexOf(i) > -1 ? fruits : randomText;
        newList[i] = chooseWord(newList, reference, repeat);
      }
    }
    setList(newList);
  }

  function shuffle() {
    const selected = 3; // randomize(4); // expected output: 0, 1, 2 or 3
    const indexArr = shuffleMethods[selected]();

    fillList(indexArr, selected === 3);
  }

  function selectItem(item, deselect) {
    if (fruits.indexOf(item) > -1) {
      setSelectionCount((prevState) => prevState + 1);
    } else {
      setWrongSelection((prevState) => {
        if (deselect) {
          return prevState - 1;
        }
        return prevState + 1;
      });
    }
  }

  async function celebrate() {
    setWinning(true);
    await setWrongSelection(0);
    window.setTimeout(() => {
      setWinning(false);
      //shuffle();
    }, 3000);
  }

  useEffect(() => {
    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectionCount === 5 && wrongSelection === 0) {
      celebrate();
    }
  }, [selectionCount, wrongSelection]);

  return (
    <div className="App">
      <h1>Fruit Bingo</h1>
      <div className={`plate ${winning ? "winning" : ""}`}>
        {list.map((item, index) => {
          return (
            <Button
              onClick={(deselect) => selectItem(item, deselect)}
              item={item}
              key={`${item}-${index}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
