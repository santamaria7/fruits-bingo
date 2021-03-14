import "./App.scss";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../Button";
import { fruits, randomText } from "../../constants";
import {
  chooseWord,
  columnShuffle,
  diagonalShuffle,
  multipleShuffle,
  randomize,
  rowShuffle,
} from "../../utils";
import Board from "../Board";

function App() {
  return (
    <div className="App">
      <h1>Fruit Bingo</h1>
      <Board />
    </div>
  );
}

export default App;
