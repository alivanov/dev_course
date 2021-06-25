fetch(`http://${config.development.host}:${config.development.port}/todos`)
  .then(response => {
    //https://www.tjvantoll.com/2015/09/13/fetch-and-errors
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(json => {
    console.log(json)
  })
  .catch((error) => {
    console.error(error);
  })