import surveyFillingModule from './questionTypes/surveyFillingModule.js';

// ...existing code...

const validateSurveyData = (surveyData) => {
    const title = document.querySelector('#survey-title').value;
    const description = document.querySelector('#survey-description').value;

    if (!title || !description) {
        alert('Survey title and description cannot be empty.');
        return false;
    }

    if (surveyData.length === 0) {
        alert('There must be at least one question in the survey.');
        return false;
    }

    return surveyData.every(question => {
        if (question.type === 'mcq' || question.type === 'scq') {
            return question.options && question.options.length > 0;
        }
        if (question.type === 'file') {
            return question.fileType && question.fileType.length > 0;
        }
        return true;
    });
};

const addPreviewButton = () => {
    const previewButton = document.createElement('button');
    previewButton.innerText = 'Preview Survey';
    previewButton.onclick = () => {
        const surveyData = getSurveyData(); // Assume this function collects the survey data in JSON format
        if (validateSurveyData(surveyData)) {
            const surveyForm = surveyFillingModule(surveyData);
            const newWindow = window.open();
            newWindow.document.write('<html><head><title>Survey Preview</title></head><body></body></html>');
            newWindow.document.body.appendChild(surveyForm);
        } else {
            alert('MCQ and SCQ questions must have at least one option and file questions must have a file type selected.');
        }
    };
    document.body.appendChild(previewButton);
};

const validateOnSubmit = () => {
    const form = document.querySelector('.survey-form-container');
    form.addEventListener('submit', (event) => {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('error');
                input.style.borderColor = 'red';
            } else {
                input.classList.remove('error');
                input.style.borderColor = ''; // Reset to normal border color
            }
        });

        const surveyData = getSurveyData(); // Assume this function collects the survey data in JSON format
        if (surveyData.length === 0) {
            isValid = false;
            alert('There must be at least one question in the survey.');
        }

        if (!isValid) {
            event.preventDefault();
            alert('Please fill all required fields.');
        } else {
            alert('Survey has been published successfully.');
        }
    });
};

// Change the submit button to publish button
const changeSubmitButtonToPublish = () => {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.innerText = 'Publish Survey';
    }
};

// Call the functions to add the preview button, validation, and change submit button
addPreviewButton();
validateOnSubmit();
changeSubmitButtonToPublish();

// ...existing code...
