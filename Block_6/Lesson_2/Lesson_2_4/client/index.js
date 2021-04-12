const SERVER_URL = 'https://localhost:3333';

const socket = io(SERVER_URL);

//=============================

const sendMessage = () => {
  const userId = document.getElementById('name').value;
  const body = document.getElementById('message').value;

  if (!userId || !body) {
    return alert('Name & message are required!');
  }

  fetch(`${SERVER_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, body }),
  });
};

document.getElementById('send').addEventListener('click', sendMessage);

//=============================

const renderMessage = (message) => {
  const messageEl = document.createElement('div');
  const messageUserId = document.createElement('h4');
  const messageBody = document.createElement('p');
  const messageDT = document.createElement('span');

  messageUserId.innerText = message.userId;
  messageBody.innerText = message.body;
  messageDT.innerText = new Date(message.createdAt).toLocaleString();
  messageDT.classList.add('text-muted');

  messageEl.appendChild(messageUserId);
  messageEl.appendChild(messageDT);
  messageEl.appendChild(messageBody);

  document.getElementById('messages').appendChild(messageEl);

  return messageEl;
};

//=============================

socket.on('message', renderMessage);

//=============================

fetch(`${SERVER_URL}/messages`)
  .then((res) => res.json())
  .then((messages) => {
    messages.forEach((message) => {
      renderMessage(message);
    });
  });
