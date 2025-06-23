import React from "react";
import searchImages from "../../api";

const SearchBar = ({ value, setValue, setData }) => {
  const fetchImages = async (e) => {
    e.preventDefault();
    try {
      const images = await searchImages(value);
      setData(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <>
      <form onSubmit={fetchImages}>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;
