//DOM manipulation ======================================

function modifyList(event) {
  console.log(event)

  var listItemOne = document.getElementsByClassName("list__item")[0];
  listItemOne.textContent = "List item one";

  var list = document.getElementsByClassName("list")[0];
  var listItemTwo = document.createElement("li");
  listItemTwo.classList.add("list__item");
  listItemTwo.textContent = "List item two";
  list.appendChild(listItemTwo);


  /* var list = document.getElementsByClassName("list")[0];
  list.innerHTML = `
    <li class="list__item">List item one</li>
    <li class="list__item">List item two</li>
  `; */
}

//Events ======================================

var myForm = document.getElementById('form');
myForm.onclick = function(event) { //or just form.onclick = ...
  event.target.style.backgroundColor = 'yellow';

  // a browser needs some time to make it yellow
  setTimeout(() => {
    console.dir(this);
    console.dir(event.target);
    alert("target = " + event.target.tagName + ", this=" + this.tagName);
    event.target.style.backgroundColor = '';
  }, 0);
};

for(let elem of document.querySelectorAll('.capturing-demo *')) {
  elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
  elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
}

//Environment ======================================

function sayHi() {
  console.log('Hi!');
}

window.sayHi();
console.log('Window', window);
console.log('Document', document);
console.log('Navigator', navigator);
console.log('Location', location);

function goToDocs() {
  if (confirm("Are you ready?")) {
    location.href = "https://learn.javascript.ru/browser-environment";
  }
}

//Event loop ======================================

const button = document.querySelector('#btn-event-loop-start');

for (var i = 0; i < 3; i++) {
    button.addEventListener('click', function (e) {
        console.log(i);
    });
}

button.click();
