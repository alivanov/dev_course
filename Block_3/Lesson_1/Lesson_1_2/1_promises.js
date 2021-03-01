//resolve =====================

let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("I'm done"), 1000);
});

promise.then(r => {
  console.log('resolved', r);
})

console.log('Promise does not block the execution thread!');

//reject =====================

promise = new Promise((resolve, reject) => {
  setTimeout(() => reject("Oooops!"), 1000);
});

promise.then(r => {
  console.log('resolved', r);
}).catch(e => {
  console.log('rejected', e);
}).finally(() => {
  console.log('finally executes always!');
})

//sequence =====================

promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
}).then((result) => {
  console.log('1st THEN received', result); // 1
  return result * 2;
}).then((result) => {
  console.log('2nd THEN received', result); // 2
  return result * 2;
}).then((result) => {
  console.log('3rd THEN received', result); // 4
  return result * 2;
});

//not a sequence! =====================

promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});
promise.then((result) => {
  console.log('1st THEN received', result); // 1
  return result * 2;
});
promise.then((result) => {
  console.log('2nd THEN received', result); // 1
  return result * 2;
});
promise.then((result) => {
  console.log('3rd THEN received', result); // 1
  return result * 2;
});

//fetch =====================
//see Block_1/Lesson_2/Lesson_2_1/index.js

//Promise.all =====================

console.time('promise_all');
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  //new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)), //reject!
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
  'I am not a promise!'
]).then((arr) => {
  console.log('all result', arr)
}).catch(e => {
  console.log('all error', e);
}).finally(() => {
  console.timeEnd(`promise_all`);
});

//Promise.allSettled =====================

console.time('promise_allSettled');
Promise.allSettled([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)), //reject!
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
  'I am not a promise!'
]).then((arr) => {
  console.log('allSettled result', arr)
}).catch(e => {
  console.log('allSettled error', e);
}).finally(() => {
  console.timeEnd(`promise_allSettled`);
});

//Promise.race =====================

console.time('promise_race');
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)), //reject!
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
]).then((r) => {
  console.log('race result', r)
}).catch(e => {
  console.log('race error', e);
}).finally(() => {
  console.timeEnd(`promise_race`);
});