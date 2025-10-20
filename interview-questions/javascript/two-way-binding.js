// Please create a function model(state, element), to bind state.value to the HTMLInputElement
// element.

// const input = document.createElement('input')
// const state = { value: 'BFE' }
// model(state, input)

// console.log(input.value) // 'BFE'
// state.value = 'dev'
// console.log(input.value) // 'dev'
// input.value = 'BFE.dev'
// input.dispatchEvent(new Event('change'))
// console.log(state.value) // 'BFE.dev'

function model(state, inputElement) {
  console.log("state", state);
  inputElement.value = state.value;

  Object.defineProperty(state, "value", {
    get() {
      return inputElement.value;
    },
    set(newValue) {
      inputElement.value = newValue;
    },
    configurable: true,
    enumerable:true
  });
}
