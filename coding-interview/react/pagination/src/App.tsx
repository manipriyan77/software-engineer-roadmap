import { useState } from 'react';
import './App.css';
import StarRating from './star-rating';
import CircleIntersection from './circle-intersection';
import VsCodeSidebar from './vs-code-sidebar';
import Wordle from './wordle';
import { VirtualizedTable } from './virtualized-table';

function App() {
  const [rating, setRating] = useState(0);
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Value', accessor: 'value' },
  ];

  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    value: i + 7,
  }));
  return (
    <>
      {/* <StarRating rating={rating} setRating={setRating} /> */}
      {/* <CircleIntersection /> */}
      {/* <VsCodeSidebar /> */}
      {/* <Wordle /> */}
      <VirtualizedTable columns={columns} data={data} />
    </>
  );
}

export default App;
