const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafee(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);

  const data = doc.data();
  name.textContent = data.name;
  city.textContent = data.city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();

    let id = e.target.parentElement.getAttribute('data-id');
    if (confirm("Are you sure?")) {
      db.collection('cafes').doc(id).delete();
    }
  });
}

//getting data (capital letters in firestore come before lower case letters)
/* db.collection('cafes').orderBy('name').get().then((snapshot) => {
  console.log(snapshot.docs);

  snapshot.docs.forEach(doc => {
    renderCafee(doc);
  });
}); */

//custom query demo (index is needed)
db.collection('cafes').where('city', '==', 'Stambul').orderBy('name').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    //console.log(doc.data());
  });
});

//saving data
form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent reloading the page on submit

  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  });

  form.name.value = '';
  form.city.value = '';
});

//real-time listener
db.collection('cafes').orderBy('name').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();

  //console.log('changes', changes);

  changes.forEach(change => {
    //console.log('change', change.doc.data());
    if (change.type === 'added') {
      return renderCafee(change.doc);
    }

    if (change.type === 'removed') {
      let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
      return cafeList.removeChild(li);
    }
  });
});

//updating document
//db.collection('cafes').doc('VJJnX9qF5U9hbIZMZvvE').update({name: 'Funny guy!'}); //updates only the specified property
//db.collection('cafes').doc('J2KRPOuSwfCQU0uB4ELl').set({name: 'Sushi'}); //replaces the whole document but id remains the same