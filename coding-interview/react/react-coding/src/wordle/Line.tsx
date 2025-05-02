function Line({ guess, solution }) {
  const tiles = [];
  let className = `tile`;

  if (
    solution.trim() !== "" &&
    guess.trim() !== "" &&
    solution.includes(guess)
  ) {
    className += " close";
  }
  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    tiles.push(
      <div key={i} className={`${className}`}>
        {char}
      </div>
    );
  }
  return <section className="box">{tiles}</section>;
}

export default Line;
