//Shadow DOM ======================================

var shadowEl = document.querySelector(".shadow-host");
var shadow = shadowEl.attachShadow({mode: 'open'});

var link = document.createElement("a");
link.href = shadowEl.querySelector("a").href;
link.innerHTML = `
    <span aria-label="Twitter icon"></span> 
    ${shadowEl.querySelector("a").textContent}
`;

shadow.appendChild(link);

const styles = document.createElement("style");
styles.textContent = `
  a, span {
    vertical-align: top;
    display: inline-block;
    box-sizing: border-box;
  }

  a {
      height: 20px;
      padding: 1px 8px 1px 6px;
      background-color: #1b95e0;
      color: #fff;
      border-radius: 3px;
      font-weight: 500;
      font-size: 11px;
      font-family:'Helvetica Neue', Arial, sans-serif;
      line-height: 18px;
      text-decoration: none;   
  }

  a:hover {  background-color: #0c7abf; }

  span {
      position: relative;
      top: 2px;
      width: 14px;
      height: 14px;
      margin-right: 3px;
      background: transparent 0 0 no-repeat;
      background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
  }
`;

shadow.appendChild(styles);

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
