const userName = {name: ''};

const message = {
	from: '',
	to: '',
	text: '',
	type: ''
}

const messages = document.querySelector('.messages');

let setIntervalId;


function login() {
    userName.name = document.querySelector('.login-input').value;

    if(userName.name !== '') {
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userName);

        promise.then(loginSuccess);
        promise.catch(loginFail);
    }
}

function loginSuccess() {
    const loginScreen = document.querySelector('.login-screen');
    loginScreen.classList.add('invisible');
    setIntervalId = setInterval(statusCheck, 5000);
    setInterval(chatRefresher, 3000);
}

function loginFail() {
    const inputName = document.querySelector('.login-input');
    inputName.value = '';
    inputName.placeholder = 'Tente outro nome';
}

function statusCheck() {
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', userName);
}

function chatRefresher() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    
    promise.then(chatMessages);
    // promise.catch(disconect);
}

function chatMessages(response) {
    messages.innerHTML = '';
    const allMessages = response.data;
    allMessages.map(chatBuilder);
}

function chatBuilder(element) {
    if(element.type === 'status') {
        messages.innerHTML += `<li class="${element.type}"> <span class="time">${element.time}</span> <span class="from">${element.from}</span> ${element.text}</li>`
    } else if(element.type === 'message') {
        messages.innerHTML += `<li class="${element.type}"> <span class="time">${element.time}</span> <span class="from">${element.from}</span> para <span class="to">${element.to}</span>: ${element.text}</li>`
    } else if(element.type === 'private_message') {
        messages.innerHTML += `<li class="${element.type}"> <span class="time">${element.time}</span> <span class="from">${element.from}</span> reservadamente para <span class="to">${element.to}</span>: ${element.text}`
    }
}

function sendMessage() {
    message.from = userName.name;
    message.text = document.querySelector('.text-message').value;
    message.to = 'Todos';
    message.type = 'message';

    axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', message)

    document.querySelector('.text-message').value = '';
}