import { useRef, useState } from "react";
import { PARAGRAPH, CHAR_STATUSES } from "../constants";

type Character = {
  ch: string;
  status: (typeof CHAR_STATUSES)[keyof typeof CHAR_STATUSES]; // "untyped" | "correct" | "incorrect"
};

const intialCharacter: Character[] = PARAGRAPH.split("").map((ch) => {
  return { ch, status: CHAR_STATUSES.UNTYPED }; // ✅ pick a single status
});

const TypeRacer = () => {
  const [characters, setCharacters] = useState<Character[]>(intialCharacter);
  const [inputCharacters, setInputCharacters] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const updatedCharacters = characters.map((char, i) => {
      let status = CHAR_STATUSES.UNTYPED;

      if (i < value.length) {
        if (char.ch === value[i]) {
          status = CHAR_STATUSES.CORRECT;
        } else {
          status = CHAR_STATUSES.INCORRECT;
        }
      }

      return {
        ch: char.ch,
        status,
      };
    });
    setInputCharacters(value);
    setCharacters(updatedCharacters);
  };

  const inputFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="type_racer_container" onClick={inputFocus}>
      <section className="timer">30</section>
      <section className="paragraph">
        {characters.map((char, i) => {
          return (
            <span className={`char ${char.status}`} key={`${i}-${char.ch}`}>
              {char.ch === " " ? <>&nbsp;</> : char.ch}
            </span>
          );
        })}
      </section>
      <section className="result">Result</section>
      <input
        ref={inputRef}
        type="text"
        value={inputCharacters}
        className="hidden_input"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TypeRacer;
