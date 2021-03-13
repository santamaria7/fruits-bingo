import "./App.scss";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../Button";
import { fruits, randomText } from "../../constants";

function App() {
  const [list, setList] = useState([]);
  const [selectionCount, setSelectionCount] = useState(0);
  const [wrongSelection, setWrongSelection] = useState(0);
  const [winning, setWinning] = useState(false);
  function randomize(end) {
    return Math.floor(Math.random() * Math.floor(end));
  }

  function chooseWord(newList, reference, repeat) {
    let j = randomize(25);
    if (!repeat) {
      while (newList.indexOf(reference[j]) > -1) {
        j = randomize(25);
      }
    }

    return reference[j];
  }

  function fillList(indexArr, repeat) {
    const newList = [];
    let i;
    for (i = 0; i < 25; i++) {
      if (i === 12) {
        // The free slot
        newList[i] = "";
      } else {
        newList[i] =
          indexArr.indexOf(i) > -1
            ? chooseWord(newList, fruits, repeat) // choose randomly from fruits array
            : chooseWord(newList, randomText, repeat); //choose randomly from words array
      }
    }
    setList(newList);
  }
  function columnShuffle() {
    const start = randomize(5);
    const indexArr = [];
    let i;
    for (i = 0; i < 5; i++) {
      indexArr[i] = start + i * 5;
    }
    return indexArr;
  }
  function rowShuffle() {
    /*
     * row number 0 => 00 01 02 03 04
     * row number 1 => 05 06 07 08 09
     * row number 2 => 10 11 12 13 14
     * row number 3 => 15 16 17 18 19
     * row number 4 => 20 21 22 23 24
     *
     * */
    let rowNumber = randomize(5);
    const indexArr = [];
    let i;
    for (i = 0; i < 5; i++) {
      indexArr[i] = rowNumber * 5 + i;
    }
    return indexArr;
  }
  function diagonalShuffle() {
    /*
     * row number 0 => 00 01 02 03 04
     * row number 1 => 05 06 07 08 09
     * row number 2 => 10 11 12 13 14
     * row number 3 => 15 16 17 18 19
     * row number 4 => 20 21 22 23 24
     *
     * */
    let i;
    const indexArr = [];
    const side = randomize(2); // 0 or 1
    if (side === 0) {
      // from left to right \
      for (i = 0; i < 5; i++) {
        indexArr[i] = 6 * i; //  5 * i + i
      }
    } else {
      //from right to left /
      for (i = 5; i > 0; i--) {
        indexArr[i] = 4 * i; // i * 5 - i
      }
    }
    return indexArr;
  }
  function multipleShuffle() {
    // The simplest case of having 1 row, 1 column and 1 diagonal bingo
    const indexArr1 = rowShuffle();
    const indexArr2 = columnShuffle();
    const indexArr3 = diagonalShuffle();
    return [...new Set([...indexArr1, ...indexArr2, ...indexArr3])];
  }
  const shuffleMethods = useMemo(() => {
    return {
      0: columnShuffle,
      1: rowShuffle,
      2: diagonalShuffle,
      3: multipleShuffle,
    };
  }, []);
  function shuffle() {
    const selected = randomize(4); // expected output: 0, 1, 2 or 3
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
    setSelectionCount(0);
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
