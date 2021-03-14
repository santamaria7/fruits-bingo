export function randomize(end) {
  return Math.floor(Math.random() * Math.floor(end));
}

export function chooseWord(newList, reference, repeat) {
  let j = randomize(25);
  if (!repeat) {
    while (newList.indexOf(reference[j]) > -1) {
      j = randomize(25);
    }
  }

  return reference[j];
}

export function columnShuffle() {
  const start = randomize(5);
  const indexArr = [];
  let i;
  for (i = 0; i < 5; i++) {
    indexArr[i] = start + i * 5;
  }
  return { 0: indexArr };
}
export function rowShuffle() {
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
  return { 1: indexArr };
}
export function diagonalShuffle() {
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
      indexArr[i-1] = 4 * i; // i * 5 - i
    }
  }
  return { 2: indexArr };
}
export function multipleShuffle() {
  // The simplest case of having 1 row, 1 column and 1 diagonal bingo
  const indexArr1 = rowShuffle();
  const indexArr2 = columnShuffle();
  const indexArr3 = diagonalShuffle();
  return { ...indexArr1, ...indexArr2, ...indexArr3 };
}
