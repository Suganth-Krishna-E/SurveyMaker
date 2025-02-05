import codeMaker from '../utils/codemaker.js';

const navigationBar = (username) => ({
    tag: 'ul',
    attributes: {
        class: 'nav-bar dis-fl',
        id: 'nav-bar'
    },
    subTags: [
        {
            tag: 'div',
            attributes: {
                class: 'nav-title dis-fl'
            },
            valueInsideTag: 'Survey Maker'
        },
        {
            tag: 'li',
            attributes: {
                id: 'username-display',
                class: 'nav-username'
            },
            valueInsideTag: username
        }
    ]
});

let outputElement;

function loadInitialData(username) {
    outputElement = codeMaker.convertIntoHtml(navigationBar(username));
}

function getData() {
    return outputElement;
}

export { loadInitialData, getData };
