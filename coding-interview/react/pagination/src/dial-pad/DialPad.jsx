import React, { useState, useCallback, useMemo } from "react";
import DialNumbers from "./DialNumbers";

const DialPad = () => {
  const [enteredNumbers, setEnteredNumbers] = useState("");

  // Memoize numbers array to prevent unnecessary re-renders
  const initialNumbers = useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ number: i, enable: true })),
    []
  );

  const [numbers, setNumbers] = useState(initialNumbers);

  // Memoize the removeLastElement function
  const removeLastElement = useCallback(() => {
    if (!enteredNumbers.length) return;

    const lastNumber = +enteredNumbers.slice(-1);
    const newEnteredNumbers = enteredNumbers.slice(0, -1);

    setNumbers((prevNumbers) =>
      prevNumbers.map((num) =>
        num.number === lastNumber ? { ...num, enable: true } : num
      )
    );

    setEnteredNumbers(newEnteredNumbers);
  }, [enteredNumbers]);

  return (
    <div>
      <section className="entered_numbers">
        {enteredNumbers}
        <button
          onClick={removeLastElement}
          disabled={enteredNumbers.length === 0}
        >
          close
        </button>
      </section>
      <DialNumbers
        setEnteredNumbers={setEnteredNumbers}
        enteredNumbers={enteredNumbers}
        numbers={numbers}
        setNumbers={setNumbers}
      />
    </div>
  );
};

export default DialPad;
