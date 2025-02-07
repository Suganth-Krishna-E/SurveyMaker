const generateSurveyForm = (questionJson) => {
    const createElement = (tag, attributes = {}, subTags = [], valueInsideTag = '') => {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
        if (valueInsideTag) element.innerText = valueInsideTag;
        subTags.forEach(subTag => element.appendChild(createElement(subTag.tag, subTag.attributes, subTag.subTags, subTag.valueInsideTag)));
        return element;
    };

    const formContainer = document.createElement('div');
    formContainer.className = 'survey-form-container';

    questionJson.forEach(question => {
        const questionElement = createElement(question.tag, question.attributes, question.subTags, question.valueInsideTag);
        formContainer.appendChild(questionElement);
    });

    return formContainer;
};

const surveyFillingModule = generateSurveyForm;

export default surveyFillingModule;
