import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';

const loginFormInput = {
    tag: 'div',
    attributes: {
        class: 'main-container'
    },
    subTags: [
        {
            tag: 'div',
            attributes: {
                class: 'login-container dis-fl'
            },
            subTags: [
                {
                    tag: 'form',
                    attributes: {
                        class: 'login-base-form',
                        id: 'loginForm'
                    },
                    subTags: [
                        {
                            tag: 'div',
                            attributes: {
                                class: 'form-group'
                            },
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'login-username'
                                    },
                                    valueInsideTag: 'Username'
                                },
                                {
                                    tag: 'input',
                                    attributes: {
                                        type: 'text',
                                        id: 'login-username',
                                        name: 'username',
                                        placeholder: 'Enter your username',
                                        required: true
                                    },
                                    validations: {
                                        validationName: 'alphanumeric',
                                        errorMessage: 'Username must be alphanumeric'
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            attributes: {
                                class: 'form-group'
                            },
                            subTags: [
                                {
                                    tag: 'label',
                                    attributes: {
                                        for: 'login-password'
                                    },
                                    valueInsideTag: 'Password'
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
                                                id: 'login-password',
                                                name: 'password',
                                                placeholder: 'Enter your password',
                                                required: true
                                            },
                                            validations: {
                                                validationName: 'password',
                                                errorMessage: 'Password must be at least 8 characters long'
                                            }
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
                                },
                                {
                                    tag: 'div',
                                    attributes: {
                                        id: 'caps-lock-warning',
                                        style: 'display: none; color: red;'
                                    },
                                    valueInsideTag: 'Caps Lock is on!'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            attributes: {
                                class: 'submit-group dis-fl'
                            },
                            subTags: [
                                {
                                    tag: 'button',
                                    attributes: {
                                        type: 'submit',
                                        id: 'login-submit',
                                        class: 'submit-btn'
                                    },
                                    valueInsideTag: 'Login'
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

function getData() {
    returnElement = codeMaker.convertIntoHtml(loginFormInput);
    attachValidationHandlers();
    attachCapsLockWarning();
    attachPasswordVisibilityToggle();
    return returnElement;
}

const validationsOfElements = {
    'login-username': (event) => {
        const value = event.target.value;
        event.target.style.border = validateAlphanumeric(value) ? '2px solid black' : '2px solid red';
    },
    'login-password': (event) => {
        const value = event.target.value;
        event.target.style.border = validatePassword(value) ? '2px solid black' : '2px solid red';
    }
};

function attachValidationHandlers() {
    const inputElements = returnElement.getElementsByTagName('input');
    const formBase = returnElement.getElementsByClassName('login-base-form')[0];

    formBase.addEventListener('submit', (e) => {
        for (const element of inputElements) {
            if (element.style.border === '2px solid red' || element.value === '') {
                element.focus();
                e.preventDefault();
                return;
            } else {
                e.preventDefault();
                if (indexScriptModule.loginToSite(document.getElementById('login-username').value, document.getElementById('login-password').value)) {
                    swal("Login Successful", "Please use our features", "success");
                    indexScriptModule.loadHomePageAfterLogin(document.getElementById('login-username').value);
                } else {
                    swal("Wrong Credentials", "Please provide correct credentials", "warning");
                }
            }
        }
    });

    for (const element of inputElements) {
        const id = element.getAttribute('id');
        if (validationsOfElements[id]) {
            element.addEventListener('blur', validationsOfElements[id]);
            element.addEventListener('paste', validationsOfElements[id]);
        }
    }
}

function attachCapsLockWarning() {
    const passwordInput = returnElement.querySelector('#login-password');
    const capsLockWarning = returnElement.querySelector('#caps-lock-warning');

    passwordInput.addEventListener('keyup', (event) => {
        if (event.getModifierState('CapsLock')) {
            capsLockWarning.style.display = 'block';
        } else {
            capsLockWarning.style.display = 'none';
        }
    });
}

function attachPasswordVisibilityToggle() {
    const passwordInput = returnElement.querySelector('#login-password');
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

function validateAlphanumeric(value) {
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

function checkIsCapitalAlphabet(character) {
    return character >= 'A' && character <= 'Z';
}

function checkIsSmallAlphabet(character) {
    return character >= 'a' && character <= 'z';
}

function checkIsSpace(character) {
    return character === ' ';
}

function validatePassword(value) {
    return value.length >= 8; 
}

export { getData };
