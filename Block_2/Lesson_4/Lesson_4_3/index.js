console.warn('// Arrays ===========================================');
var array = [1,1,2,3,3,5];
console.log('_.uniq(array)', _.uniq(array));
console.log('_.reverse(array)', _.reverse(array));
console.log('Note the mutation!!!', array);
console.log('_.last(array)', _.last(array));

console.warn('//Collections ===========================================');
var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'alex', 'age': 36, 'active': true },
    { 'user': 'bob', 'age': 37, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
  ];
   
  
  console.log("_.filter(users, { 'age': 36, 'active': true })", _.filter(users, { 'age': 36, 'active': true }));
  console.log("_.find(users, 'active') - finds the first match", _.find(users, 'active'));
  console.log("_.findLast(users, (o) => {return o.age === 36})", _.findLast(users, (user, idx, coll) => {
      console.error('curr user:', user);
      console.error('user index:', idx);
      console.error('source collection:', coll);
      return user.age === 36
  }));
  console.log("_.groupBy(users, 'age')", _.groupBy(users, 'age'));
  console.log("_.sortBy(users, ['user', 'age'])", _.sortBy(users, ['user', 'age']));

//Throttling vs Debounce ====================================================

// 1
var inside1 = $(".inside-1");
var thing1 = $(".thing-1");
var count1 = $(".count-1");
inside1.on('scroll', function() {
  thing1.css("top", inside1[0].scrollTop);
  count1.html(parseInt(count1.html())+1);
});

// 2 
var inside2 = $(".inside-2");
var thing2 = $(".thing-2");
var count2 = $(".count-2");
inside2.on('scroll', _.throttle(function() {
  thing2.css("top", inside2[0].scrollTop); 
  count2.html(parseInt(count2.html())+1);
}, 150));

// 3
var inside3 = $(".inside-3");
var thing3 = $(".thing-3");
var count3 = $(".count-3");
inside3.on('scroll', _.debounce(function() {
  thing3.css("top", inside3[0].scrollTop);
  count3.html(parseInt(count3.html())+1);
}, 100));