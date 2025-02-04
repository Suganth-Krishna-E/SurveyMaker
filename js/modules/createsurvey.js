import codeMaker from '../utils/codemaker.js';

const createSurveyForm = {
    tag: 'main',
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'survey-container-main' },
            subTags: [
                {
                    tag: 'form',
                    attributes: { class: 'survey-form', id: 'createSurveyForm' },
                    subTags: [
                        {
                            tag: 'input',
                            attributes: {
                                type: 'text',
                                id: 'survey-title',
                                name: 'title',
                                placeholder: 'Survey Title',
                                required: true,
                                minlength: 7,
                                maxlength: 30,
                            },
                        },
                        {
                            tag: 'textarea',
                            attributes: {
                                id: 'survey-description',
                                name: 'description',
                                placeholder: 'Survey Description',
                                required: true,
                                minlength: 30,
                                maxlength: 500,
                            },
                        },
                        {
                            tag: 'div',
                            attributes: { id: 'questions-container', class: 'questions-container' },
                        },
                        {
                            tag: 'button',
                            attributes: { type: 'button', id: 'add-question-btn', class: 'add-question-btn' },
                            valueInsideTag: 'Add Question',
                        },
                        {
                            tag: 'button',
                            attributes: { type: 'submit', id: 'save-survey-btn', class: 'submit-btn' },
                            valueInsideTag: 'Save Survey',
                        },
                    ],
                },
            ],
        },
    ],
};

const questionTemplate = () => ({
    tag: 'div',
    attributes: { class: 'question' },
    subTags: [
        {
            tag: 'input',
            attributes: {
                type: 'text',
                class: 'question-title',
                placeholder: 'Untitled Question',
                required: true,
                minlength: 10,
                maxlength: 1000,
            },
        },
        {
            tag: 'select',
            attributes: { class: 'input-type' },
            subTags: [
                { tag: 'option', attributes: { value: 'Paragraph' }, valueInsideTag: 'Paragraph' },
                { tag: 'option', attributes: { value: 'Radio' }, valueInsideTag: 'Radio Button' },
                { tag: 'option', attributes: { value: 'Checkbox' }, valueInsideTag: 'Checkbox' },
                { tag: 'option', attributes: { value: 'Numeric' }, valueInsideTag: 'Numeric Input' },
                { tag: 'option', attributes: { value: 'File' }, valueInsideTag: 'File Upload' },
            ],
        },
        {
            tag: 'div',
            attributes: { class: 'file-options-container', style: 'display:none;' },
            subTags: [
                {
                    tag: 'select',
                    attributes: { class: 'file-input-type' },
                    subTags: [
                        { tag: 'option', attributes: { value: 'checkbox' }, valueInsideTag: 'Checkbox' },
                        { tag: 'option', attributes: { value: 'dropdown' }, valueInsideTag: 'Dropdown' },
                    ],
                },
                {
                    tag: 'select',
                    attributes: { class: 'file-type-select' },
                    subTags: [
                        { tag: 'option', attributes: { value: 'image/jpeg' }, valueInsideTag: 'JPEG Image (.jpg)' },
                        { tag: 'option', attributes: { value: 'image/png' }, valueInsideTag: 'PNG Image (.png)' },
                        { tag: 'option', attributes: { value: 'application/pdf' }, valueInsideTag: 'PDF (.pdf)' },
                        { tag: 'option', attributes: { value: 'audio/mpeg' }, valueInsideTag: 'MP3 Audio (.mp3)' },
                        { tag: 'option', attributes: { value: 'video/mp4' }, valueInsideTag: 'MP4 Video (.mp4)' },
                        { tag: 'option', attributes: { value: 'application/msword' }, valueInsideTag: 'Word Document (.doc)' },
                    ],
                },
            ],
        },
        {
            tag: 'input',
            attributes: { type: 'checkbox', class: 'required-check' },
        },
        {
            tag: 'textarea',
            attributes: { class: 'question-notes', placeholder: 'Additional Notes (Optional)' },
        },
        {
            tag: 'button',
            attributes: { type: 'button', class: 'copy-question' },
            valueInsideTag: '📋', // Copy symbol
        },
        {
            tag: 'button',
            attributes: { type: 'button', class: 'delete-question' },
            valueInsideTag: '❌', // Delete symbol
        },
        {
            tag: 'input',
            attributes: { type: 'text', class: 'question-input', placeholder: 'Enter answer here' },
        },
    ],
});

export function getData() {
    const formElement = codeMaker.convertIntoHtml(createSurveyForm);
    attachEventHandlers(formElement);
    return formElement;
}

function attachEventHandlers(formElement) {
    const questionsContainer = formElement.querySelector('#questions-container');
    formElement.querySelector('#add-question-btn').addEventListener('click', () => {
        const newQuestion = codeMaker.convertIntoHtml(questionTemplate());
        questionsContainer.appendChild(newQuestion);
        addQuestionHandlers(newQuestion);
    });

    formElement.querySelector('#save-survey-btn').addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Survey saved with questions!');
    });
}

function addQuestionHandlers(questionElement) {
    const inputTypeSelect = questionElement.querySelector('.input-type');
    const fileOptionsContainer = questionElement.querySelector('.file-options-container');
    const fileInputTypeSelect = questionElement.querySelector('.file-input-type');
    const questionInput = questionElement.querySelector('.question-input');

    // Handle changes to the input type
    inputTypeSelect.addEventListener('change', (event) => {
        const selectedType = event.target.value;
        updateQuestionInputType(selectedType, questionInput, fileOptionsContainer);
    });

    questionElement.querySelector('.delete-question').addEventListener('click', () => {
        questionElement.remove();
    });

    questionElement.querySelector('.copy-question').addEventListener('click', () => {
        const clonedQuestion = questionElement.cloneNode(true);
        questionElement.parentElement.appendChild(clonedQuestion);
        addQuestionHandlers(clonedQuestion);
    });
}

function updateQuestionInputType(type, inputElement, fileOptionsContainer) {
    const fileInputTypeSelect = fileOptionsContainer.querySelector('.file-input-type');
    const fileTypeSelect = fileOptionsContainer.querySelector('.file-type-select');
    switch (type) {
        case 'Paragraph':
            inputElement.setAttribute('type', 'textarea');
            inputElement.setAttribute('placeholder', 'Enter your text here');
            fileOptionsContainer.style.display = 'none';
            break;
        case 'Radio':
            inputElement.setAttribute('type', 'radio');
            inputElement.setAttribute('placeholder', 'Choose an option');
            fileOptionsContainer.style.display = 'none';
            break;
        case 'Checkbox':
            inputElement.setAttribute('type', 'checkbox');
            inputElement.setAttribute('placeholder', 'Select the option');
            fileOptionsContainer.style.display = 'none';
            break;
        case 'Numeric':
            inputElement.setAttribute('type', 'number');
            inputElement.setAttribute('placeholder', 'Enter a number');
            fileOptionsContainer.style.display = 'none';
            break;
        case 'File':
            inputElement.setAttribute('type', 'file');
            inputElement.setAttribute('multiple', 'true'); // Allow multiple file uploads
            fileOptionsContainer.style.display = 'block'; // Show file options
            break;
        default:
            inputElement.setAttribute('type', 'text');
            fileOptionsContainer.style.display = 'none';
            break;
    }
}

export default { getData };



 