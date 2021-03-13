import React, { useEffect, useMemo, useState } from "react";
import { fruits } from "../../constants";

function Button({ onClick, item }) {
  const [selected, setSelected] = useState(false);
  const [deselect, setDeselect] = useState(false);
  function handleClick() {
    setSelected((prevState) => !prevState);
    setDeselect((prevState) => !prevState, onClick(deselect));
  }
  const className = useMemo(() => {
    if (selected) {
      if (fruits.indexOf(item) > -1) return "selected right";
      return "selected wrong";
    }
  }, [selected, item]);
  useEffect(() => {
    setSelected(false);
  }, [item]);
  return (
    <div className={className} onClick={handleClick}>
      <span>{item}</span>
    </div>
  );
}

export default Button;
