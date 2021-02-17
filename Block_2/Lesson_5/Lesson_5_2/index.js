// try/catch works in runtime only!

//----------------------------

console.log('\x1b[31m', '//No exceptions --------------------------------------------- \n', '\x1b[0m');

function noExceptions() {
  try {
    console.log('try start');
    // ... no errors
    console.log('try end');
  } catch(e) {
    console.log('ERROR!', e); //we will never get there
  } finally {
    console.log("finally block will be always executed");  
  }
  console.log("the rest of the code");
}

noExceptions();

//----------------------------

console.log('\x1b[31m', '//Exception exists --------------------------------------------- \n', '\x1b[0m');

function exception() {
  var obj = {};

  try {
    console.log('try start');
    
    console.log(obj.invalidKey.value); //error here as obj is empty!

    console.log('try end');
  } catch(e) {
    console.log('ERROR DETECTED!!!', e);
    console.log('ERROR name!!!', e.name);
    console.log('ERROR message!!!', e.message);
    console.log('ERROR stack!!!', e.stack);
  } finally {
    console.log("finally block will be always executed");  
  }
  
  console.log("the rest of the code");
}

exception();

//----------------------------

console.log('\x1b[31m', '//Try/catch works with syncronous code only --------------------------------------------- \n', '\x1b[0m');

/* function exceptionsAsync() {
    try {
      setTimeout(function() {
        //Error, SyntaxError, ReferenceError, RangeError
        throw new Error(); //the error will be displayed in the console but it won't be caught
      }, 1000);
    } catch (e) {
      console.log('ERROR!', e); //we will never get there
    }
}

exceptionsAsync(); */

//----------------------------

console.log('\x1b[31m', '//Forwarding --------------------------------------------- \n', '\x1b[0m');

function readData() {
  var data = '{ "name": "Pete", "age": 30 }';

  try {
    var user = JSON.parse(data);
    /* if (!user.address) {
      throw new SyntaxError("Invalid data received!");
    } */

    blabla(); // error
  } catch (e) {

      if (e.name != 'SyntaxError') {
          throw e; // forwarding
      }

      console.log( "INTERNAL catch", e );
  } finally {
    console.log("INTERNAL finally block");  
  }
}

try {
  readData();
} catch (e) {
  console.log( "EXTERNAL catch", e );
} finally {
  console.log("EXTERNAL finally block");  
}
