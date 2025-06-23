import { useState } from "react";
import SearchBar from "./components/Searchbar";
import ImageList from "./components/ImageList";

function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <SearchBar
        value={searchText}
        setValue={setSearchText}
        setData={setData}
      />
      {data.length !== 0 && <ImageList data={data} />}
    </>
  );
}

export default App;
