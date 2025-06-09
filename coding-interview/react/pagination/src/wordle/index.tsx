import React, { useState, useEffect } from 'react';
import data from './data.json';

const API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';

const Line = ({ guess }) => {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    let char = guess[i];
    tiles.push(<div className="tile">{char}</div>);
  }

  return <section className="line">{tiles}</section>;
};

const Wordle = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  useEffect(() => {
    // async function fetchWord() {
    //   const response = await fetch(API_URL, {
    //     mode: 'no-cors',
    //   });
    //   const data = await response.json();
    //   // Note: You won't be able to read the response body with no-cors
    //   console.log('response :>> ', data);
    // }

    // fetchWord();

    const selectedWord = Math.floor(Math.random() * data.data.length);
    setSolution(data.data[selectedWord]);
  }, []);

  useEffect(() => {
    const handleType = (event) => {
      console.log('event.key :>> ', event.key);
    };

    window.addEventListener('keydown', handleType);

    return () => window.removeEventListener('keydown', handleType);
  }, []);
  return (
    <div>
      {guesses.map((guess) => {
        return <Line guess={guess ?? ''} />;
      })}
    </div>
  );
};

export default Wordle;
