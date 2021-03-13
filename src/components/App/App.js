import "./App.css";
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

  function randomize(end) {
    return Math.floor(Math.random() * Math.floor(end));
  }
  function fillList(indexArr) {
    const newList = list.map((item, index) => {
      let fruitIndex;
      if (indexArr.indexOf(index) > -1) {
        // select from fruitsArray and return
        let i = randomize(5);
        if (i === fruitIndex) {
          i = randomize(5);
        }
        fruitIndex = i;
        return fruits[fruitIndex];
      }
      // select randomly from textArray and return
      return randomText[randomize(25)];
      //TODO: fix duplicates
    });
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
  function diagonalShuffle () {
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
    for (i = 0; i < 5; i++) {
      indexArr[i] = i * 5 + i;
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

    const newList = shuffleMethods[selected]();
    setList(newList);
  }

  useEffect(() => {
    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="App"></div>;
}

export default App;
