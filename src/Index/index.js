// Registration window
const registration_window = document.getElementById("registrationPopup");
const registration_button = document.getElementById("registrationButton");
const registrations_close = document.getElementsByClassName("registrationClose")[0];

registration_button.onclick = function() {
    clearReg();
    registration_window.style.display = "block";
}

registrations_close.onclick = function() {
    registration_window.style.display = "none";
}

// Login window
const login_window = document.getElementById("loginPopup");
const login_button = document.getElementById("loginButton");
const login_close = document.getElementsByClassName("loginClose")[0];

login_button.onclick = function() {
    clearLog();
    login_window.style.display = "block";
}

login_close.onclick = function() {
    login_window.style.display = "none";
}

// Popup handling
window.onclick = function(event) {
    if (event.target == registration_window) {
        registration_window.style.display = "none";
    }
    else if (event.target == login_window) {
        login_window.style.display = "none";
    }
}

// iFrame handler
const iframe = document.getElementById('Main-frame');

function changeIframe(url) {
    const currentAdress = window.location.href;
    const address = currentAdress + url;

    iframe.style.opacity = '0';

    setTimeout(() => {
        iframe.src = address;
        iframe.style.opacity = '1';
    }, 300)
}

// Validator of registration
const userName = document.querySelector('#username')
const email = document.querySelector('#email')
const password1 = document.querySelector('#pass1')
const password2 = document.querySelector('#pass2')
const clearButton = document.querySelector('.reset')
const sendReg = document.querySelector('.sendReg')

let correctness = 1;

function showOrHideErrorMessage(input, message) {
    const box = input.parentElement;
    const errorMessage = box.querySelector('.error');
    errorMessage.textContent = message;
}

function checkIsThereError(input) {
    const box = input.parentElement;
    const errorMessage = box.querySelector('.error');
    
    if (errorMessage.textContent.length != 0)
    {
        correctness = 0;
    }
}

function checkIsItEmpty(input) {
    if (input.value.length == 0)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function checkInputLength(input, minValue) {
    if (input.value.length < minValue && input.value.length != 0) {
        showOrHideErrorMessage(input, `Field should consist minimum ${minValue} chars`);
    }
    else {
        showOrHideErrorMessage(input, '');
    }
}

function checkEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email.value) && email.value.length != 0) {
        showOrHideErrorMessage(email, 'Email address is invalid');
    }
    else {
        showOrHideErrorMessage(email, '');
    }
}

function checkPassword() {
    if (password1.value !== password2.value && password2.value.length != 0) {
        showOrHideErrorMessage(password2, 'Passwords are not same');
    }
    else {
        showOrHideErrorMessage(password2, '');
    }
}

function clearReg() {
    userName.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';

    showOrHideErrorMessage(userName, '');
    showOrHideErrorMessage(email, '');
    showOrHideErrorMessage(password1, '');
    showOrHideErrorMessage(password2, '');
}

userName.addEventListener('input', () => {
    checkInputLength(userName, 5);
})

email.addEventListener('input', () => {
    checkEmail(email);
})

password1.addEventListener('input', () => {
    checkInputLength(password1, 8);
    checkPassword();
})

password2.addEventListener('input', () => {
    checkPassword();
})

sendReg.addEventListener('click', (e) => {
    e.preventDefault();
    checkIsThereError(userName);
    checkIsThereError(email);
    checkIsThereError(password1);
    checkIsThereError(password2);

    const userNameEmpty = checkIsItEmpty(userName);
    const emailEmpty = checkIsItEmpty(email);
    const password1Empty = checkIsItEmpty(password1);
    const password2Empty = checkIsItEmpty(password2);

    if(correctness == 1 && !userNameEmpty && !emailEmpty && !password1Empty && !password2Empty)
    {
        alert('You has been registered!');
        clearReg();
    }
    else if(userNameEmpty && emailEmpty && password1Empty && password2Empty)
    {
        alert('Spreadsheet is empty.');
    }
    else if ((userNameEmpty || emailEmpty || password1Empty || password2Empty) && correctness == 1)
    {
        alert('Fill a data!');
    }
    else
    {
        alert('Invalid data has been introduced!');
    }

    correctness = 1; 
})

clearButton.addEventListener('click', (e) => {
    e.preventDefault();

    clearReg();
})

// Validator of login
const emailLogin = document.querySelector('#emailLogin');
const passowrdLogin = document.querySelector('#passLogin');
const sendLog = document.querySelector('.sendLog')

emailLogin.addEventListener('input', () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(emailLogin.value) && emailLogin.value.length != 0) {
        showOrHideErrorMessage(emailLogin, 'Email adress is invalid');
    }
    else {
        showOrHideErrorMessage(emailLogin, '');
    }
})

passowrdLogin.addEventListener('input', () => {
    checkInputLength(passowrdLogin, 8);
    checkPassword();
})

function clearLog() {
    emailLogin.value = '';
    passowrdLogin.value = '';

    showOrHideErrorMessage(emailLogin, '');
    showOrHideErrorMessage(passowrdLogin, '');
}

sendLog.addEventListener('click', (e) => {
    e.preventDefault();
    checkIsThereError(emailLogin);
    checkIsThereError(passowrdLogin);

    const emailEmpty = checkIsItEmpty(emailLogin);
    const passwordEmpty = checkIsItEmpty(passowrdLogin);

    if(correctness == 1 && !emailEmpty && !passwordEmpty)
    {
        alert('You has been loged!');
        clearLog();
    }
    else if(emailEmpty && passwordEmpty)
    {
        alert('Spreadsheet is empty.');
    }
    else if ((emailEmpty || passwordEmpty) && correctness == 1)
    {
        alert('Fill a data!');
    }
    else
    {
        alert('Invalid data has been introduced!');
    }

    correctness = 1; 
})