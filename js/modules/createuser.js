import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';

console.log(indexScriptModule.checkIsUserAvailable("Suganth"));

const dataInput = {
    tag: 'main',
    subTags: [
        {
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
                                class: 'input-fields dis-fl'
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
                                                // validationName: 'camelcase-nospace-charsonly',
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
                                                // validationName: 'email-with-@trustraceonly',
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
                                                // validationName: 'small-nospace-alphanumeric-withunderscoreonly',
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
                                            tag: 'input',
                                            attributes: {
                                                type: 'password',
                                                id: 'password',
                                                name: 'passsword',
                                                placeholder: 'Enter your new password',
                                                required: true  
                                            },
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            tag: 'div',
                            attributes: {
                                id: 'submit-field'
                            },
                            subTags: [
                                {
                                    tag: 'div',
                                    subTags: [
                                        {
                                            tag: 'button',
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
const submitbutton = returnElement.getElementsByTagName('button');

submitbutton[0].addEventListener('click', (e) => {
    checkAllFeildsValid();
    const data = {
        name: inputelements[0].value,
        email: inputelements[1].value,
        customerid: inputelements[2].value,
        pincode: inputelements[3].value,
        password: inputelements[4].value,
    }
    if(allElemntsValid === true && indexScriptModule.addNewUser(data)) {        
        console.log(`User created`);
        console.log(e);    
        clearAllInputs();
        allElemntsValid = true;
        swal({
            title: "User Created!",
            text: "The user details are sucessfully created.",
            icon: "success"
        });
        loadLoginModule();
        console.log("Login Module Loaded");
    }
    else {
        swal({
            icon: "error",
            title: "Oops...",
            text: "The inputs are not valid",
          });
        console.log("Not all fields are valid");
    }
    e.preventDefault();
})

let allElemntsValid = true;

const validationsOfElements = {
    'user-name': (event) => {
        const valueInsideTag = event.target.value;
        // console.log(` ${validateAlphabetsWithCapital(valueInsideTag)}`);
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
            console.error(result.message);
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
    // console.log(element.getAttribute('id'));
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
    // /@yahoo.com\s*$/.test(myemail)

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
        // console.log("Length of ID false");
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
    // console.log(`DOB ${dob} current Date ${date}`);
    // console.log(date.getFullYear() - dob.getFullYear());
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
    // console.log(`Starting Letter function called ${text}`);
    if(text !== undefined) {
        if(text.length === 1 || text[text.length - 2] === " ") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        console.error("Undefined value passed");
        return false;
    }
}

function isStartingOrEnding(text) {
    // console.log(text);
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
        console.error("Undefined value passed");
        return false;
    }
}

function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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


function getData() {
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