import { useCallback, useEffect, useState } from 'react';

const MultiSelectDropdown = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedvalues, setSelectedvalues] = useState([]);

  function debounce(fn: Function, delay: number) {
    let timeOut;
    return function (...args) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  const fetchUsers = debounce(async function fetchUsers(searchTerm: string) {
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
      const data = await response.json();
      setData(data.users);
      setLoader(false);
      console.log('data :>> ', data);
    } catch (error) {
      console.log('errro :>> ', error);
    }
  }, 1000);

  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 1000), []);

  function handleSelectedValues(value: string) {
    const alreadyValues = selectedvalues.includes(value);
    if (!alreadyValues) {
      setSelectedvalues((prev) => {
        return [...prev, value];
      });
    } else {
      alert('Value already exist');
    }
  }
  useEffect(() => {
    if (search) {
      setLoader(true);
      debouncedFetchUsers(search);
    }
    if (search === '') {
      setData([]);
    }
  }, [search, debouncedFetchUsers]);

  return (
    <div>
      <input
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {loader ? (
        <h1>Loading...</h1>
      ) : (
        <section className="user_container">
          {data.length > 0 &&
            data.map((user: { firstName: string }, i) => {
              return (
                <div
                  onClick={() => {
                    handleSelectedValues(user.firstName);
                  }}
                >
                  {user.firstName}
                </div>
              );
            })}
        </section>
      )}
      {selectedvalues.length > 0 &&
        selectedvalues.map((value, index) => {
          return (
            <span className="selected_value" key={index}>
              {value}
            </span>
          );
        })}
    </div>
  );
};

export default MultiSelectDropdown;
