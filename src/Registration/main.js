// const - deklaracja "zmiennej stałej"
// querySelector - metoda do pobierania elementów html
// # - odwołanie do identyfikatora elementu html (atrybutu id)
// . - odwołanie do klasy elementu html (atrubutu class)
const userName = document.querySelector('#username')
const email = document.querySelector('#email')
const password1 = document.querySelector('#pass1')
const password2 = document.querySelector('#pass2')
const clearButton = document.querySelector('.reset')
const sendButton = document.querySelector('.send')

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
        showOrHideErrorMessage(input, `Pole powinno zawierać minimum ${minValue} znaków`);
    }
    else {
        showOrHideErrorMessage(input, '');
    }
}

function checkEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email.value) && email.value.length != 0) {
        showOrHideErrorMessage(email, 'Adres email jest nieprawidłowy');
    }
    else {
        showOrHideErrorMessage(email, '');
    }
}

function checkPassword() {
    if (password1.value !== password2.value && password2.value.length != 0) {
        showOrHideErrorMessage(password2, 'Hasła są różne');
    }
    else {
        showOrHideErrorMessage(password2, '');
    }
}

function clear() {
    // Wyczyść tekst
    userName.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';

    // Ukryj błędy
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

sendButton.addEventListener('click', (e) => {
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
        alert('Twoje dane zostały wysłane');
        clear();
    }
    else if(userNameEmpty && emailEmpty && password1Empty && password2Empty)
    {
        alert('Arkusz pusty');
    }
    else if ((userNameEmpty || emailEmpty || password1Empty || password2Empty) && correctness == 1)
    {
        alert('Uzupełnij dane');
    }
    else
    {
        alert('Niepoprawne dane');
    }

    correctness = 1; 
})

clearButton.addEventListener('click', (e) => {
    e.preventDefault();

    clear();
})