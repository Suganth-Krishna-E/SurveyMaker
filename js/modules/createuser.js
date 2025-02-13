import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';


const dataInput =  {
    tag: 'div',
    attributes: {
        class: 'main-container wid23 dis-fl'
    },
    subTags: [
        {
            tag: 'form',
            attributes: {
                class: 'details-base-form',
            },
            subTags: [
                {
                    tag: 'div',
                    attributes: {
                        class: 'input-fields-two-column dis-fl'
                    },
                    subTags: [
                        {
                            tag: 'div',
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'user-name',
                                    },
                                    valueInsideTag: 'Name'
                                },
                                {
                                    tag: 'input',
                                    attributes: {
                                        type: 'text',
                                        id: 'user-name',
                                        name: 'user-name',
                                        placeholder: 'Enter your name',
                                        required: true
                                    },
                                    validations: {
                                        errorMessage: 'Follow the specified format'
                                    }
                                }
                            ]
                        }, 
                        {
                            tag: 'div',
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'user-email',
                                    },
                                    valueInsideTag: 'Email'
                                },
                                {
                                    tag: 'input',
                                    attributes: {
                                        type: 'email',
                                        id: 'user-email',
                                        name: 'user-email',
                                        placeholder: 'Enter your email',
                                        required: true
                                    },
                                    validations: {
                                        errorMessage: 'Out of organization email'
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'customer-id',
                                    },
                                    valueInsideTag: 'Customer ID'
                                },
                                {
                                    tag: 'input',
                                    attributes: {
                                        type: 'text',
                                        id: 'customer-id',
                                        name: 'customer-id',
                                        placeholder: 'Enter your customer ID',
                                        required: true
                                    },
                                    validations: {
                                        errorMessage: 'Not a valid Customer ID'
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'pincode',
                                    },
                                    valueInsideTag: 'Pincode(INDIA only)'
                                },
                                {
                                    tag: 'input',
                                    attributes: {
                                        type: 'text',
                                        id: 'pincode',
                                        name: 'pincode',
                                        placeholder: 'Enter your current pincode',
                                        required: true  
                                    },
                                    validations: {
                                        validationName: 'indian-pincode',
                                        errorMessage: 'Ohhh Enter a proper pincode'
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'password',
                                    },
                                    valueInsideTag: 'New Password'
                                },
                                {
                                    tag: 'div',
                                    attributes: {
                                        class: 'password-container'
                                    },
                                    subTags: [
                                        {
                                            tag: 'input',
                                            attributes: {
                                                type: 'password',
                                                id: 'password',
                                                name: 'passsword',
                                                placeholder: 'Enter your new password',
                                                required: true  
                                            },
                                        },
                                        {
                                            tag: 'button',
                                            attributes: {
                                                type: 'button',
                                                id: 'toggle-password-visibility',
                                                class: 'toggle-password-visibility'
                                            },
                                            valueInsideTag: '👁️'
                                        }
                                    ]
                                }
                                
                            ]
                        },
                    ]
                },
                {
                    tag: 'div',
                    attributes: {
                        id: 'submit-field',
                        class: 'submit-field dis-fl'
                    },
                    subTags: [
                        {
                            tag: 'div',
                            attributes: {
                                type: 'submit',
                                id: 'submit-btn'    
                            },
                            valueInsideTag: 'Submit'
                        }
                    ]
                }
            ]    
        }    
    ]
};

let returnElement;

loadInitialData();

function loadInitialData() {
    returnElement = codeMaker.convertIntoHtml(dataInput);
}

const inputelements = returnElement.getElementsByTagName('input');
const formbase = returnElement.getElementsByClassName('details-base-form');
const submitbutton = returnElement.querySelector('#submit-btn');
const labels = returnElement.querySelectorAll('label');

labels.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.cursor = 'pointer';
    })
});

submitbutton.style.cursor = 'not-allowed';

submitbutton.addEventListener('click', (e) => {
    allElemntsValid = true;
    checkAllFeildsValid();
    const data = {
        name: inputelements[0].value,
        email: inputelements[1].value,
        customerid: inputelements[2].value,
        pincode: inputelements[3].value,
        password: inputelements[4].value,
    }
    if(allElemntsValid === true && indexScriptModule.addNewUser(data)) {        
        clearAllInputs();
        submitbutton.style.cursor = 'pointer';
        allElemntsValid = true;
        swal({
            title: "User Created!",
            text: "The user details are sucessfully created.",
            icon: "success"
        });
        loadLoginModule();
    }
    else {
        submitbutton.style.cursor = 'not-allowed';
        swal({
            icon: "error",
            title: "Oops...",
            text: "The inputs are not valid",
          });
    }
});

submitbutton.addEventListener('mouseover', () => {
    submitbutton.style.cursor = 'pointer';
})

let allElemntsValid = false;

const validationsOfElements = {
    'user-name': (event) => {
        const valueInsideTag = event.target.value;
        if(validateAlphabetsWithCapital(valueInsideTag)) {
            event.target.style.border = '2px solid black';
        }
        else {
            event.target.style.border = '2px solid red';
        }
    },
    'user-email': (event) => {
        const valueInsideTag = event.target.value;
        if(validateEmail(valueInsideTag, '@trustrace.com')) {
            event.target.style.border = '2px solid black';
        }
        else {
            event.target.style.border = '2px solid red';
        }
    },
    'customer-id': (event) => {
        const valueInsideTag = event.target.value;
        if(validateCustomerId(valueInsideTag)) {
            event.target.style.border = '2px solid black';
        }
        else {
            event.target.style.border = '2px solid red';
        }
    },
    'pincode': (event) => {
        const valueInsideTag = event.target.value;
        if(validatePincode(valueInsideTag)) {
            event.target.style.border = '2px solid black';
        }
        else {
            event.target.style.border = '2px solid red';
        }
    },
    'password': (event) => {
        const valueInsideTag = event.target.value;
        const result = validatePassword(valueInsideTag);
        if (result.valid) {
            event.target.style.border = '2px solid black';
        } 
        else {
            event.target.style.border = '2px solid red';
        }
    }
}

formbase[0].addEventListener("submit", (e) => {
    for(const element of inputelements) {
        if(element.style.border === "2px solid red") {
            element.focus();
            e.preventDefault();
            return;
        }
        else if(element.value === "") {
            element.focus();
            e.preventDefault();
            return;

        }
    }
});

for(const element of inputelements) {
    element.addEventListener("blur", validationsOfElements[element.getAttribute('id')]);
    element.addEventListener("paste", validationsOfElements[element.getAttribute('id')]);
}

function checkAllFeildsValid() {
    for(const element of inputelements) {
        if(element.style.border === "2px solid red") {
            allElemntsValid = false;
        }
    }
}

function validatePincode(value) {
    if(/^[1-9][0-9]{5}$/.test(value)) {
        return true;
    }
    else {
        return false;
    }
}

function validateAlphabetsWithCapital(value) {
    const length = value.length;
    if(length < 1 || length > 20) {
        return false;
    }
    for(let index in value) {
        index = parseInt(index);
        if(checkIsCapitalAlphabet(value.charAt(index))) {
            if(index === 0) {
                continue;
            }
            else if(value.charAt(index - 1) === ' ') {
                continue;
            }
            else {
                return false;
            }
        }
        else if(checkIsSmallAlphabet(value.charAt(index))) {
            continue;
        }
        else if(checkIsSpace(value.charAt(index))) {
            if(index === 0) {
                return false;
            }
            else if(index + 1 === value.length) {
                return false;
            }
            else if(value.charAt(index - 1) === ' ' || value.charAt(index + 1) === ' ') {
                return false;
            }
            else {
                continue;
            }
        }
        else {
            return false;
        }
    }
    return true;
}

function validateEmail(value, domain) {
    const endingPattern = new RegExp(domain + "\\s*$");
    const pattern = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);

    if(endingPattern.test(value)) {
        if(pattern.test(value)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function validateCustomerId(value) {
    if(value.length < 1 || value.length > 15) {
        return false;
    }
    for(const data of value) {
        if(checkIsCapitalAlphabet(data)) {
            return false;
        }
        else if(checkIsSpace(data)) {
            return false;
        }
        else if(checkIsSmallAlphabet(data)) {
            continue;
        }
        else if(checkIsNumber(data)) {
            continue;
        }
        else if(data === '_') {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function validateDob(value, date) {
    const dob = new Date(value);
    if(((date.getFullYear() - dob.getFullYear()) > 0) || ((date.getMonth() - dob.getMonth()) > 0) || ((date.getDay() - dob.getDay()) > 0)) {
        return true;
    }
    else {
        return false;
    }
}

function checkIsCapitalAlphabet(letter) {
    if(letter >= 'A' && letter <= 'Z') {
        return true;
    }
    else {
        return false;
    }
}

function checkIsSmallAlphabet(letter) {
    if(letter >= 'a' && letter <= 'z') {
        return true;
    }
    else {
        return false;
    }
}

function checkIsNumber(letter) {
    if(letter >= '0' && letter <= '9') {
        return true;
    }
    else {
        return false;
    }
}

function checkIsSpace(letter) {
    if(letter === ' ') {
        return true;
    }
    else {
        return false;
    }
}


function isStartingLetter(text) {
    if(text !== undefined) {
        if(text.length === 1 || text[text.length - 2] === " ") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function isStartingOrEnding(text) {
    if(text !== undefined) {
        if(text.length === 1) {
            return true;
        }
        else if(text[text.length - 1] === " ") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);

    if (password.length < minLength) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    if (!hasUppercase) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!hasLowercase) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!hasNumber) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character" };
    }

    return { valid: true, message: "Password is valid" };
}

function attachPasswordVisibilityToggle() {
    const passwordInput = returnElement.querySelector('#password');
    const toggleButton = returnElement.querySelector('#toggle-password-visibility');

    toggleButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleButton.textContent = '👁️';
        }
    });
}


function getData() {
    attachPasswordVisibilityToggle();

   return returnElement;
}

function clearAllInputs() {
    for(const element of inputelements) {
        element.value = '';
    }
}

async function loadIndexModule() {
    await indexScriptModule.loadIndexPage();
}

async function loadLoginModule() {
    await indexScriptModule.loadModule('login');
}

export { getData };