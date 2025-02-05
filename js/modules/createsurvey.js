import codeMaker from '../utils/codemaker.js';

let questionCount = 1; // Auto-incrementing question ID

const createSurveyForm = {
    tag: 'div',
    attributes: { class: 'main-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'survey-header' },
            subTags: [
                { tag: 'input', attributes: { type: 'text', id: 'survey-title', placeholder: 'Survey Title' } },
                { tag: 'textarea', attributes: { id: 'survey-description', placeholder: 'Survey Description' } }
            ]
        },
        { tag: 'div', attributes: { class: 'survey-body', id: 'questions-container' } },
        {
            tag: 'div',
            attributes: { class: 'survey-footer' },
            subTags: [
                { tag: 'button', attributes: { type: 'button', id: 'add-question' }, valueInsideTag: 'Add Question' },
                { tag: 'button', attributes: { type: 'submit', id: 'submit-survey' }, valueInsideTag: 'Submit Survey' }
            ]
        }
    ]
};

const questionTemplate = (id) => ({
    tag: 'div',
    attributes: { class: 'question-container', id: `question-container-${id}` },
    subTags: [
        { tag: 'input', attributes: { type: 'text', id: `question-title-${id}`, class: 'question-title', placeholder: 'Question Title' } },
        {
            tag: 'select',
            attributes: { id: `question-type-${id}`, class: 'question-type' },
            subTags: [
                { tag: 'option', attributes: { value: 'text' }, valueInsideTag: 'Text' },
                { tag: 'option', attributes: { value: 'scq' }, valueInsideTag: 'Single Choice Question' },
                { tag: 'option', attributes: { value: 'mcq' }, valueInsideTag: 'Multiple Choice Question' },
                { tag: 'option', attributes: { value: 'numeric' }, valueInsideTag: 'Numeric' },
                { tag: 'option', attributes: { value: 'file' }, valueInsideTag: 'File' }
            ]
        },
        { tag: 'div', attributes: { class: 'answer-container', id: `answer-container-${id}` } },
        { tag: 'button', attributes: { type: 'button', class: 'delete-question', id: `delete-question-${id}` }, valueInsideTag: '❌' }
    ]
});

function attachEventHandlers(formElement) {
    const questionsContainer = formElement.querySelector('#questions-container');
    formElement.querySelector('#add-question').addEventListener('click', () => {
        addNewQuestion(questionsContainer);
    });

    formElement.querySelector('#submit-survey').addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Survey submitted with questions!');
    });
}

function addNewQuestion(container) {
    const newQuestion = codeMaker.convertIntoHtml(questionTemplate(questionCount));
    container.appendChild(newQuestion);
    addQuestionHandlers(newQuestion, questionCount);
    questionCount++;
}

function addQuestionHandlers(questionElement, id) {
    const questionTypeSelect = questionElement.querySelector(`#question-type-${id}`);
    const answerContainer = questionElement.querySelector(`#answer-container-${id}`);
    questionTypeSelect.addEventListener('change', () => {
        updateAnswerInput(questionTypeSelect.value, answerContainer, id);
    });
    questionElement.querySelector(`#delete-question-${id}`).addEventListener('click', () => {
        questionElement.remove();
    });
}

function updateAnswerInput(type, container, id) {
    container.innerHTML = '';
    let inputElement;
    switch (type) {
        case 'text':
            inputElement = { tag: 'input', attributes: { type: 'text', class: 'answer-box', placeholder: 'Answer' } };
            break;
        case 'scq':
            inputElement = {
                tag: 'div',
                attributes: { class: 'scq-answer-container' },
                subTags: [
                    { tag: 'input', attributes: { type: 'radio', class: 'scq-choice', name: `scq-group-${id}`, placeholder: 'Option 1' } },
                    { tag: 'button', attributes: { id: `scq-option-adder-${id}` }, valueInsideTag: 'Add Option' }
                ]
            };
            break;
        case 'mcq':
            inputElement = {
                tag: 'div',
                attributes: { class: 'mcq-answer-container' },
                subTags: [
                    { tag: 'input', attributes: { type: 'checkbox', class: 'mcq-choice', placeholder: 'Option 1' } },
                    { tag: 'button', attributes: { id: `mcq-option-adder-${id}` }, valueInsideTag: 'Add Option' }
                ]
            };
            break;
        case 'numeric':
            inputElement = { tag: 'input', attributes: { type: 'number', class: 'answer-numeric', placeholder: 'Answer' } };
            break;
        case 'file':
            inputElement = {
                tag: 'div',
                attributes: { class: 'file-answer-container' },
                subTags: [
                    { tag: 'input', attributes: { type: 'file', class: 'file-answer' } },
                    {
                        tag: 'select',
                        subTags: [
                            { tag: 'option', attributes: { value: 'pdf' }, valueInsideTag: 'PDF' },
                            { tag: 'option', attributes: { value: 'doc' }, valueInsideTag: 'DOC' },
                            { tag: 'option', attributes: { value: 'jpg' }, valueInsideTag: 'JPG' }
                        ]
                    }
                ]
            };
            break;
    }
    const answerElement = codeMaker.convertIntoHtml(inputElement);
    container.appendChild(answerElement);
}

export function getData() {
    const formElement = codeMaker.convertIntoHtml(createSurveyForm);
    attachEventHandlers(formElement);
    return formElement;
}

export default { getData };
