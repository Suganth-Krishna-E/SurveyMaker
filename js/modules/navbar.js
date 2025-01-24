import codeMaker from '../utils/codemaker.js';

const navigationBar = {
    tag: 'ul',
    attributes: {
        class: 'nav-bar dis-fl',
        id: 'nav-bar'
    },
    subTags: [
        {
            tag: 'div',
            attributes: {
                class: 'dis-fl'
            },
            valueInsideTag: 'Survey Maker'
        },
        {
            tag: 'li',
            attributes: {
                id: 'createUser'
            },
            valueInsideTag: 'Create User'
        },
        {
            tag: 'li',
            attributes: {
                id: 'login'
            },
            valueInsideTag: 'Login'
        }
    ]
};

let outputElement;

function loadInitialData() {
    outputElement = codeMaker.convertIntoHtml(navigationBar);
}

loadInitialData();

function getData() {
    return outputElement;
}

export { getData };