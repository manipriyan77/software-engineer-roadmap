const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));

function App() {
  // console.log("called");
  return React.createElement(
    "section",
    null,
    React.createElement("h1", null, "counters"),
    React.createElement(
      "section",
      null,
      React.createElement(counter),
      React.createElement(counter)
    )
  );
}

function counter() {
  return React.createElement(
    "article",
    null,
    React.createElement("p", null, "Clicked 2 time"),
    React.createElement("button", null, "Click me")
  );
}
// console.log(React.createElement(App));

const articleElements = document.getElementsByTagName("section");
const sectionElement = articleElements.item[0];
// console.log(
//   "articleElements,sectionElement :>> ",
//   articleElements,
//   sectionElement
// );

setTimeout(() => {
  const articleElements = document.getElementsByTagName("section");
  const sectionElement = articleElements.item(0);
  // console.log(
  //   "articleElements,sectionElement :>> ",
  //   articleElements,
  //   sectionElement
  // );

  //   The code in the settimeout will print the values because React code runs on Async so in the sync one it will print empty because the js code runs
  // before the React code whereas in the settimeout it will run once the React code runs so we can able to see the console
}, 1000);
