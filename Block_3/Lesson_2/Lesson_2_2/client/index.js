fetch('http://devdemo:3333/todos')
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })
  .catch((error) => {
    console.error('Error:', error);
  })