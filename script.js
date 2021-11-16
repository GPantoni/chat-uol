const userName = {name: ''};

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
}

function loginFail() {
    const inputName = document.querySelector('.login-input');
    inputName.value = '';
    inputName.placeholder = 'Tente outro nome';
}

function statusCheck() {
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', userName);
}