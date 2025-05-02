import { useState } from 'react';

const TransferList = () => {
  const [leftData, setLeftData] = useState(['first', 'second', 'third', 'fourth']);
  const [rightData, setRightData] = useState([]);
  const [newValues, setNewValues] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  function addValueHandler(value: string) {
    setNewValues((prevValues) => {
      return prevValues.includes(value)
        ? prevValues.filter((item) => item !== value) // Remove if already selected
        : [...prevValues, value]; // Add if not selected
    });

    setSelectedValues((prevSelected) => {
      return prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];
    });
  }

  function updateRightArray() {
    setLeftData((prevLeft) => prevLeft.filter((data) => !newValues.includes(data)));
    setRightData((prevRight) => [...prevRight, ...newValues]);
    setNewValues([]);
    setSelectedValues([]);
  }

  function updateLeftArray() {
    setRightData((prevRight) => prevRight.filter((data) => !newValues.includes(data)));
    setLeftData((prevLeft) => [...prevLeft, ...newValues]);
    setNewValues([]);
    setSelectedValues([]);
  }

  return (
    <section className="transfer_list_container">
      <div className="transfer_left_container">
        {leftData.map((value, index) => (
          <section
            key={index}
            onClick={() => addValueHandler(value)}
            className={selectedValues.includes(value) ? 'selected' : ''}
          >
            {value}
          </section>
        ))}
      </div>
      <div className="transfer_icons_container">
        <button onClick={updateRightArray}>Right</button>
        <button onClick={updateLeftArray}>Left</button>
      </div>
      <div className="transfer_right_container">
        {rightData.map((value, index) => (
          <section
            key={index}
            onClick={() => addValueHandler(value)}
            className={selectedValues.includes(value) ? 'selected' : ''}
          >
            {value}
          </section>
        ))}
      </div>
    </section>
  );
};

export default TransferList;
