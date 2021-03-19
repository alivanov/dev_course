fetch(`http://${config.development.host}:${config.development.port}/todos`)
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })
  .catch((error) => {
    console.error('Error:', error);
  })