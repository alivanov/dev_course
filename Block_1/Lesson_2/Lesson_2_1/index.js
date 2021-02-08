function foo(n) {
  console.log(n*2);
}

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => {
    console.log(json)

    let arr = [1,2,3,4,5];
    
    //to discuss debugging in browsers...
    //debugger

    for (n of arr) {
      foo(n);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  })