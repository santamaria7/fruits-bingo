
import './App.css';
import React, {useEffect, useMemo, useState} from "react";

function App() {
  const [list, setList] = useState([]);

  function columnShuffle(){

  }
  function rowShuffle(){

  }
  function diagnolShuffle(){

  }

  function randomize(end){
    return Math.floor(Math.random() * Math.floor(end));
  }

  const shuffleMethods = useMemo(()=>{
    return {
      0: columnShuffle,
      1: rowShuffle,
      2: diagnolShuffle
    }
  },[]);
  function shuffle(){
    const selected = randomize(3); // expected output: 0, 1 or 2

    const newList = shuffleMethods[selected]();
    setList(newList);
  }

  useEffect(()=>{
    shuffle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;
