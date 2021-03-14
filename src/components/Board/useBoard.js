import { useEffect, useMemo, useState } from "react";
import {
  chooseWord,
  columnShuffle,
  diagonalShuffle,
  multipleShuffle,
  randomize,
  rowShuffle,
} from "../../utils";
import { fruits, randomText } from "../../constants";

export const useBoard = () => {
  const [list, setList] = useState([]);
  const [selectionCount, setSelectionCount] = useState(0);
  const [wrongSelection, setWrongSelection] = useState(0);
  const [winning, setWinning] = useState(false);
  const [center, setCenter] = useState({
    0: false, //column
    1: false, //row
    2: true, //diagonal
  });
  const [indexObj, setIndexObj] = useState({});
  const [selectedFruits, setSelectedFruits] = useState([]);

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

  function updateStates(obj) {
    setIndexObj(obj);
    setSelectionCount(0);
    setSelectedFruits([]);
    const centerPayload = Object.keys(obj).reduce((a, b) => {
      a[b] = obj[b].indexOf(12) > -1;
      return a;
    }, {});
    setCenter(centerPayload);
  }

  function shuffle() {
    const selected = randomize(4); // expected output: 0, 1, 2 or 3
    const obj = shuffleMethods[selected]();
    let indexArr = obj[selected] || [];
    if (selected === 3) {
      const concat = Object.values(obj).reduce((a, b) => a.concat(b), []);
      indexArr = [...new Set([...concat])];
    }
    updateStates(obj);
    fillList(indexArr, selected === 3);
  }

  function selectItem(item, deselect) {
    if (fruits.indexOf(item.name) > -1) {
      setSelectionCount((prevState) => prevState + 1);
      setSelectedFruits((prevState) => [...prevState, item.index]);
    } else {
      setWrongSelection((prevState) => {
        if (deselect) {
          return prevState - 1;
        }
        return prevState + 1;
      });
    }
  }
  function getSharedItems(direction) {
    const obj = { ...indexObj };
    delete obj[direction];
    const arr = Object.values(obj).flat();
    return selectedFruits.filter((item, index) => arr.indexOf(item) > -1);
  }
  async function celebrate(direction) {
    const sharedItems = getSharedItems(direction);
    setWinning(true);
    setSelectedFruits(sharedItems);
    setSelectionCount(sharedItems.length);
    await setWrongSelection(0);
    window.setTimeout(() => {
      setWinning(false);
    }, 3000);
  }

  function findDirection() {
    let direction = 0;
    Object.keys(indexObj).forEach((x) => {
      let count = 0;
      const reference = indexObj[x];
      selectedFruits.forEach((n) => {
        if (reference.indexOf(n) > -1) {
          count += 1;
        }
      });
      if (
        count === reference.length ||
        (count === reference.length - 1 && reference.indexOf(12) > -1)
      ) {
        direction = x;
      }
    });
    return direction;
  }

  useEffect(() => {
    shuffle();
  }, []);
  useEffect(() => {
    const direction = findDirection();
    if (
      (selectionCount === 5 || (selectionCount === 4 && center[direction])) &&
      wrongSelection === 0
    ) {
      celebrate(direction);
    }
  }, [selectionCount, wrongSelection, center]);
  return {
    selectItem,
    shuffle,
    list,
    winning,
  };
};
