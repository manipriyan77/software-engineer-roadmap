import { useState } from 'react';
import './App.css';
import StarRating from './star-rating';

function App() {
  const [rating, setRating] = useState(0);

  return (
    <>
      <StarRating rating={rating} setRating={setRating} />
    </>
  );
}

export default App;
