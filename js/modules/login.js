import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';

const loginFormInput = {
    tag: 'main',
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
            }
            else {
                e.preventDefault();
                if(indexScriptModule.loginToSite(document.getElementById('login-username').value, document.getElementById('login-password').value)) {
                    swal({
                        title: "Login Sucessful",
                        text: "Please use our features",
                        icon: "success",
                        button: "Ok",
                      });
                      loadHomeModule();
                }
                else {
                    swal({
                        title: "Wrong Credentials",
                        text: "Please provide corerct credentials",
                        icon: "warning",
                        button: "Ok",
                      });
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

// Validation Helpers
function validateAlphanumeric(value) {
    return true;
}

function validatePassword(value) {
    return value.length >= 8; // Add more rules if necessary
}

async function loadHomeModule() {
    await indexScriptModule.loadModule('home');
}

export { getData };
