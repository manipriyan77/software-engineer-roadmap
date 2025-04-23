import { useState } from "react";
import "./App.css";
import StarRating from "./star-rating";
import CircleIntersection from "./circle-intersection";
import VsCodeSidebar from "./vs-code-sidebar";
import DialPadContainer from "./dial-pad/DialPadContainer.jsx";
function App() {
  const [rating, setRating] = useState(0);

  return (
    <>
      {/* <StarRating rating={rating} setRating={setRating} /> */}
      {/* <CircleIntersection /> */}
      {/* <VsCodeSidebar /> */}
      <DialPadContainer />
    </>
  );
}

export default App;
