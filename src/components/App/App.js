import "./App.scss";
import React, { useEffect, useMemo, useState } from "react";

const fruits = ["pomegranate", "peach", "pear", "orange", "sour cherry"];
const randomText = [
  "suggest",
  "bag",
  "ponder",
  "zinc",
  "come",
  "slip",
  "coherent",
  "infamous",
  "expect",
  "unsightly",
  "mix",
  "fancy",
  "meal",
  "devilish",
  "division",
  "public",
  "field",
  "stop",
  "material",
  "fluttering",
  "brass",
  "adorable",
  "camp",
  "sit",
  "tiny",
];

function App() {
  const [list, setList] = useState([]);
  const [selectionCount, setSelectionCount] = useState(0);
  function randomize(end) {
    return Math.floor(Math.random() * Math.floor(end));
  }

  function chooseWord(newList, reference, length) {
    let j = randomize(length);
    while (newList.indexOf(fruits[j]) > -1) {
      j = randomize(length);
    }
    return reference[j];
  }

  function fillList(indexArr) {
    const newList = [];
    let i;
    for (i = 0; i < 25; i++) {
      if (indexArr.indexOf(i) > -1) {
        // select from fruitsArray
        newList[i] = chooseWord(newList, fruits, 5);
      } else {
        // select randomly from textArray
        newList[i] = chooseWord(newList, randomText, 25);
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
    fillList(indexArr);
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
    fillList(indexArr);
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

    fillList(indexArr);
  }

  const shuffleMethods = useMemo(() => {
    return {
      0: columnShuffle,
      1: rowShuffle,
      2: diagonalShuffle,
    };
  }, []);
  function shuffle() {
    const selected = randomize(3); // expected output: 0, 1 or 2
    shuffleMethods[selected]();
  }
  function selectItem(item) {
    if (fruits.indexOf(item) > -1) {
      setSelectionCount((prevState) => prevState + 1);
    }
  }
  useEffect(() => {
    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectionCount === 5) {
      alert("Yay! You won!");
      shuffle();
      setSelectionCount(0);
    }
  }, [selectionCount]);
  return (
    <div className="App">
      <div className="plate">
        {list.map((item, index) => {
          return (
            <div
              key={`${item}-${Math.random()}`}
              onClick={() => selectItem(item)}
            >
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
