import { useEffect, useState } from "react";
import searchImages from "./api";
import SearchBar from "./components/Searchbar";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await searchImages();
        setData(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <SearchBar />
      {/* You might want to render your images here */}
      {data.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
        />
      ))}
    </>
  );
}

export default App;
