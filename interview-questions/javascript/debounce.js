function debounce(func,delay) {
    let timer;
    return function (...args){
        console.log('timer:',timer);
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func.apply(this,args);
        },delay)
    }
}

function searchApi(query) {
    console.log("API call with:", query);
}

const debouncedSearch = debounce(searchApi, 300);
console.log('debouncedSearch:',debouncedSearch);
// simulate typing
debouncedSearch("a");
debouncedSearch("ap");
debouncedSearch("app");
debouncedSearch("appl");
debouncedSearch("apple");
// 👉 Only "apple" will trigger the API call after 300ms pause
