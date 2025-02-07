import codeMaker from '../utils/codemaker.js';

let questionCount = 1;

const createSurveyForm = {
    tag: 'div',
    attributes: { class: 'main-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'survey-header' },
            subTags: [
                { tag: 'textarea', attributes: { id: 'survey-title', placeholder: 'Survey Title' } },
                { tag: 'textarea', attributes: { id: 'survey-description', placeholder: 'Survey Description' } }
            ]
        },
        { tag: 'div', attributes: { class: 'survey-body', id: 'questions-container' } },
        {
            tag: 'div',
            attributes: { class: 'survey-footer dis-fl space-between' },
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
        {
            tag: 'div',
            attributes: { class: 'question-header dis-fl' },
            subTags: [
                { tag: 'textarea', attributes: { id: `question-title-${id}`, class: 'question-title', placeholder: 'Question Title' } },
                {
                    tag: 'select',
                    attributes: { id: `question-type-${id}`, class: 'question-type' },
                    subTags: [
                        { tag: 'option', attributes: { value: 'text', selected: true }, valueInsideTag: 'Text' },
                        { tag: 'option', attributes: { value: 'scq' }, valueInsideTag: 'Single Choice Question' },
                        { tag: 'option', attributes: { value: 'mcq' }, valueInsideTag: 'Multiple Choice Question' },
                        { tag: 'option', attributes: { value: 'numeric' }, valueInsideTag: 'Numeric' },
                        { tag: 'option', attributes: { value: 'file' }, valueInsideTag: 'File' }
                    ]
                }
            ]
        },
        { tag: 'div', attributes: { class: 'answer-container', id: `answer-container-${id}` } },
        {
            tag: 'div',
            attributes: { class: 'extra-notes-container dis-fl space-evenly' },
        },
        {
            tag: 'div',
            attributes: { class: 'button-container dis-fl' },
            subTags: [
                { tag: 'button', attributes: { type: 'button', class: 'delete-question', id: `delete-question-${id}` }, valueInsideTag: '❌ Delete' },
                { tag: 'button', attributes: { type: 'button', class: 'copy-question', id: `copy-question-${id}` }, valueInsideTag: '📋 Copy' }
            ]
        }
    ]
});

function attachEventHandlers(formElement) {

    const questionsContainer = formElement.querySelector('#questions-container');
    formElement.querySelector('#add-question').addEventListener('click', () => {
        addNewQuestion(questionsContainer);
        addTextAreaHandlers(questionsContainer);
    });

    formElement.querySelector('#submit-survey').addEventListener('click', (event) => {
        event.preventDefault();
        if (validateSurvey(formElement)) {
            const surveyData = getSurveyData(formElement);
            console.log(JSON.stringify(surveyData, null, 2));
            swal("Survey Submitted", "Your survey has been submitted successfully!", "success");
        } else {
            swal("Incomplete Survey", "Please fill out all required fields.", "warning");
        }
    });

    addTextAreaHandlers(formElement)
}

function addTextAreaHandlers(container) {
    const textAreas = container.querySelectorAll('textarea');
    textAreas.forEach(textArea => {
        textArea.addEventListener('input', function() {
            console.log(this.scrollHeight);
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });
}

async function addNewQuestion(container) {
    const newQuestion = codeMaker.convertIntoHtml(questionTemplate(questionCount));
    container.appendChild(newQuestion);
    await addQuestionHandlers(newQuestion, questionCount);
    questionCount++;
}

async function addQuestionHandlers(questionElement, id) {
    const questionTypeSelect = questionElement.querySelector(`#question-type-${id}`);
    const answerContainer = questionElement.querySelector(`#answer-container-${id}`);
    questionTypeSelect.addEventListener('change', async () => {
        await updateAnswerInput(questionTypeSelect.value, answerContainer, id);
    });
    questionElement.querySelector(`#delete-question-${id}`).addEventListener('click', () => {
        swal({
            title: "Are you sure?",
            text: "Do you want to delete this question?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                questionElement.remove();
            }
        });
    });
    questionElement.querySelector(`#copy-question-${id}`).addEventListener('click', () => {
        copyQuestion(questionElement);
        swal("Question Copied", "The question has been copied.", "info");
    });
    await updateAnswerInput('text', answerContainer, id); // Set default type to 'text'
}

async function updateAnswerInput(type, container, id) {
    container.innerHTML = '';
    let inputElement;
    switch (type) {
        case 'text':
            inputElement = await import('../questionTypes/text.js');
            break;
        case 'scq':
            inputElement = await import('../questionTypes/scq.js');
            break;
        case 'mcq':
            inputElement = await import('../questionTypes/mcq.js');
            break;
        case 'numeric':
            inputElement = await import('../questionTypes/numeric.js');
            break;
        case 'file':
            inputElement = await import('../questionTypes/file.js');
            break;
    }
    const answerElement = codeMaker.convertIntoHtml(inputElement.default(id));
    container.appendChild(answerElement);
    if (type === 'scq' || type === 'mcq') {
        addOptionHandlers(container, id, type);
    }
    addTextAreaAnswerHandlers(answerElement);
}

function addTextAreaAnswerHandlers(container) {
    const textAreas = container.querySelectorAll('textarea');
    textAreas.forEach(textArea => {
        textArea.addEventListener('input', function() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });
}


function addOptionHandlers(container, id, type) {
    const addOptionButton = container.querySelector(`#${type}-option-adder-${id}`);
    addOptionButton.addEventListener('click', () => {
        const optionInput = document.createElement('div');
        optionInput.className = `${type}-option-container dis-fl`;
        optionInput.innerHTML = `
            <input type="${type === 'scq' ? 'radio' : 'checkbox'}" class="${type}-choice" name="${type === 'scq' ? `scq-group-${id}` : ''}" disabled>
            <textarea class="${type}-option-input" placeholder="Option ${container.querySelectorAll(`.${type}-choice`).length + 1}"></textarea>
        `;
        addOptionButton.parentNode.insertBefore(optionInput, addOptionButton);
        optionInput.querySelector('textarea').addEventListener('input', function() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });
}

function copyQuestion(questionElement) {
    const clonedQuestion = questionElement.cloneNode(true);
    const questionsContainer = document.querySelector('#questions-container');
    questionsContainer.appendChild(clonedQuestion);
    const newId = questionCount++;
    clonedQuestion.id = `question-container-${newId}`;
    clonedQuestion.querySelector('.question-title').id = `question-title-${newId}`;
    clonedQuestion.querySelector('.question-type').id = `question-type-${newId}`;
    clonedQuestion.querySelector('.answer-container').id = `answer-container-${newId}`;
    clonedQuestion.querySelector('.delete-question').id = `delete-question-${newId}`;
    clonedQuestion.querySelector('.copy-question').id = `copy-question-${newId}`;
    addQuestionHandlers(clonedQuestion, newId);
}

function validateSurvey(formElement) {
    const questions = formElement.querySelectorAll('.question-container');
    let isValid = true;
    questions.forEach(question => {
        const questionTitle = question.querySelector('.question-title');
        if (!questionTitle.value.trim()) {
            isValid = false;
            questionTitle.style.borderColor = 'red';
        } else {
            questionTitle.style.borderColor = '#ccc';
        }
        const answerContainer = question.querySelector('.answer-container');
        const options = answerContainer.querySelectorAll('textarea');
        options.forEach(option => {
            if (!option.value.trim()) {
                isValid = false;
                option.style.borderColor = 'red';
            } else {
                option.style.borderColor = '#ccc';
            }
        });
        if (answerContainer.querySelector('input[type="file"]')) {
            const fileInput = answerContainer.querySelector('input[type="file"]');
            if (fileInput.files.length > 0) {
                const fileSize = fileInput.files[0].size / 1024 / 1024; // in MB
                if (fileSize > 5) {
                    isValid = false;
                    fileInput.style.borderColor = 'red';
                } else {
                    fileInput.style.borderColor = '#ccc';
                }
            }
        }
    });
    return isValid;
}

function getSurveyData(formElement) {
    const surveyData = {
        title: formElement.querySelector('#survey-title').value,
        description: formElement.querySelector('#survey-description').value,
        questions: []
    };

    const questions = formElement.querySelectorAll('.question-container');
    questions.forEach(question => {
        const questionData = {
            title: question.querySelector('.question-title').value,
            type: question.querySelector('.question-type').value,
            options: [],
            notes: question.querySelector('.notes-input') ? question.querySelector('.notes-input').value : ''
        };

        const options = question.querySelectorAll('.answer-container textarea');
        options.forEach(option => {
            questionData.options.push(option.value);
        });

        surveyData.questions.push(questionData);
    });

    console.log(surveyData);

    return surveyData;
}

export function getData() {
    const formElement = codeMaker.convertIntoHtml(createSurveyForm);
    attachEventHandlers(formElement);
    return formElement;
}

export default { getData };
