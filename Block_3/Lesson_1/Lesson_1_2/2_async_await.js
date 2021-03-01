//async => means that the function will always return a promise ===========
async function f() {
  return 1; //return Promise.resolve(1);
}

f().then(console.log); // 1

//await => works inside async functions only! =============================

async function f2() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('inside setTimeout...')
      resolve("I'm done");
    }, 1000)
  });

  let result = await promise; //this will wait untill the promise is RESOLVED!

  console.log(result);
}

f2();

//Handle errors =============================

function foo() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej({
        value: null,
        message: 'Can not get a value'
      });
    }, 1000)
  })
}

async function bar() {
  try {
    const result = await foo();
    console.log('SUCCESS!!!', result)
  } catch(e) {
    console.log('ERROR', e)
  }
}

bar();