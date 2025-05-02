import { useEffect, useState } from 'react';

const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchApiData() {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setData(data.products);
    }
    fetchApiData();
  }, []);

  function pageClickHandler(i: number) {
    setPage(i);
  }

  return (
    <>
      <div className="pagiantion_container">
        {data.length > 0 &&
          data
            .slice(page * 10 - 10, page * 10)
            .map((product: { thumbnail: string; id: number }, index) => {
              return (
                <div className="image_container" key={product.id}>
                  <img src={product.thumbnail} alt="" />
                </div>
              );
            })}
      </div>
      {[...Array(data.length / 10)].map((_, i) => {
        console.log('page,i :>> ', page, i);
        return (
          <button
            onClick={() => {
              pageClickHandler(i + 1);
            }}
            key={i}
            className={`${page === i + 1 ? 'disabled' : ''}`}
          >
            {i + 1}
          </button>
        );
      })}
    </>
  );
};

export default Pagination;
