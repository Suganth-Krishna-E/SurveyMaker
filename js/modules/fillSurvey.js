import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';

const surveyFormJson = {
    tag: "main",
    subTags: [
        {
            tag: "div",
            attributes: { id: "survey-form-container", class: "survey-container" },
            subTags: [
                {
                    tag: "input",
                    attributes: { id: "survey-id-input", type: "text", placeholder: "Enter Survey ID" }
                },
                {
                    tag: "button",
                    attributes: { id: "load-survey-btn", class: "survey-btn" },
                    valueInsideTag: "Load Survey"
                },
                {
                    tag: "div",
                    attributes: { id: "survey-questions-container", class: "survey-body" }
                }
            ]
        }
    ]
};

let returnElement;

function getData() {
    returnElement = codeMaker.convertIntoHtml(surveyFormJson);
    attachEventHandlers();
    return returnElement;
}

function attachEventHandlers() {
    returnElement.querySelector("#load-survey-btn").addEventListener("click", async () => {
        const surveyId = document.getElementById("survey-id-input").value;
        if (surveyId) {
            const surveyData = await fetchSurveyData(surveyId);
            if (surveyData) {
                displaySurveyQuestions(surveyData.questions);
            } else {
                alert("Survey not found");
            }
        } else {
            alert("Please enter a survey ID");
        }
    });
}

async function fetchSurveyData(surveyId) {
    try {
        const response = await fetch(`/surveydetails/getSurveyById/${surveyId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to fetch survey data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching survey data:", error);
        return null;
    }
}

function displaySurveyQuestions(questions) {
    const questionsContainer = document.getElementById("survey-questions-container");
    questionsContainer.innerHTML = ""; // Clear previous questions

    questions.forEach(question => {
        const questionElement = createQuestionElement(question);
        questionsContainer.appendChild(questionElement);
    });
}

function createQuestionElement(question) {
    const questionContainer = document.createElement("div");
    questionContainer.className = "question-container";

    const questionTitle = document.createElement("div");
    questionTitle.className = "question-title";
    questionTitle.innerText = question.title;
    questionContainer.appendChild(questionTitle);

    if (question.type === "mcq") {
        question.options.forEach(option => {
            const optionContainer = document.createElement("div");
            optionContainer.className = "mcq-option-container";

            const optionInput = document.createElement("input");
            optionInput.type = "checkbox";
            optionInput.name = question.id;
            optionInput.value = option;
            optionContainer.appendChild(optionInput);

            const optionLabel = document.createElement("label");
            optionLabel.innerText = option;
            optionContainer.appendChild(optionLabel);

            questionContainer.appendChild(optionContainer);
        });
    } else if (question.type === "scq") {
        question.options.forEach(option => {
            const optionContainer = document.createElement("div");
            optionContainer.className = "scq-option-container";

            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = question.id;
            optionInput.value = option;
            optionContainer.appendChild(optionInput);

            const optionLabel = document.createElement("label");
            optionLabel.innerText = option;
            optionContainer.appendChild(optionLabel);

            questionContainer.appendChild(optionContainer);
        });
    } else {
        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.name = question.id;
        answerInput.className = "answer-box";
        questionContainer.appendChild(answerInput);
    }

    return questionContainer;
}

export { getData };
