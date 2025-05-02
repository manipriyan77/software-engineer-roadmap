import React, { useState } from "react";

const DialNumbers = ({
  setEnteredNumbers,
  enteredNumbers,
  numbers,
  setNumbers,
}) => {
  function disabledNumbers(enteredNumber) {
    const newNumbers = numbers.map((number) => {
      if (number.number === enteredNumber) {
        number.enable = false;
      }
      return number;
    });
    setNumbers(newNumbers);
  }
  return (
    <section>
      {numbers.map((number, index) => {
        return (
          <button
            key={index}
            disabled={!number.enable}
            onClick={() => {
              disabledNumbers(number.number);
              setEnteredNumbers(enteredNumbers + String(number.number));
            }}
          >
            {number.number}
          </button>
        );
      })}
    </section>
  );
};

export default DialNumbers;
