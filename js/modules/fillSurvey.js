import codeMaker from "../utils/codemaker.js";
import indexScriptModule from "../index-script.js"

const surveyFormJson = {
  tag: "div",
  attributes: {
    class: "main-container"
  },
  subTags: [
    {
      tag: "div",
      attributes: { id: "survey-form-container", class: "survey-container" },
      subTags: [
        {
          tag: "div",
          attributes: {
            class: "survey-search-box",
          },
          subTags: [
            {
              tag: "input",
              attributes: {
                id: "survey-id-input",
                type: "text",
                placeholder: "Enter Survey ID",
              },
            },
            {
              tag: "button",
              attributes: { id: "load-survey-btn", class: "survey-btn" },
              valueInsideTag: "Load Survey",
            },
          ],
        },
        {
          tag: "div",
          attributes: {
            id: "survey-questions-container",
            class: "survey-body",
          },
        },
        {
          tag: "div",
          attributes: {
            id: "survey-submit-container",
            class: "survey-submit-container",
          },
          subTags: [
            {
              tag: "button",
              attributes: { id: "submit-survey-btn", class: "survey-btn" },
              valueInsideTag: "Submit Survey",
            },
          ],
        },
      ],
    },
  ],
};

let returnElement;

async function getData() {
  returnElement = codeMaker.convertIntoHtml(surveyFormJson);
  attachEventHandlers();
  return returnElement;
}

function attachEventHandlers() {
  returnElement
    .querySelector("#load-survey-btn")
    .addEventListener("click", async () => {
      const surveyId = document.getElementById("survey-id-input").value;
      if (surveyId) {
        const surveyData = await fetchSurveyData(surveyId);
        if (surveyData) {
          displaySurveyQuestions(surveyData.questions, surveyData);
        } else {
          swal("No survey found", "The given surveyId is not valid", "warning");
        }
      } else {
        swal(
          "No SurveyId Found",
          "There is no surveyId given in the input",
          "warning"
        );
      }
    });

  returnElement
    .querySelector("#submit-survey-btn")
    .addEventListener("click", async () => {
      const surveyId = document.getElementById("survey-id-input").value;
      const userId = document.getElementById("username-display").innerText;
      const answers = collectResponses();
      const responsePayload = { surveyId, userId, answers };
      const result = await submitSurveyResponse(responsePayload);
      if (result) {
        swal("Success", "Survey submitted successfully", "success");
      } else {
        swal("Error", "Failed to submit survey", "error");
      }
    });
}

async function fetchSurveyData(surveyId) {
  try {
    const response = await fetch(
      `${indexScriptModule.backendConnectionUrl}/surveydetail/getSurveyById/${surveyId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function displaySurveyQuestions(questions, surveyData) {
  const questionsContainer = document.getElementById(
    "survey-questions-container"
  );

  const surveyTitle = document.createElement("h2");

  const surveyDescription = document.createElement("h4");
  surveyDescription.innerText = surveyData.title;

  surveyTitle.innerText = surveyData.title;
  surveyDescription.innerText = surveyData.description;

  questionsContainer.innerHTML = "";

  questionsContainer.appendChild(surveyTitle);
  questionsContainer.appendChild(surveyDescription);

  questions.forEach((question) => {
    const questionElement = createQuestionElement(question);
    questionsContainer.appendChild(questionElement);
  });
}

function createQuestionElement(question) {
  const questionContainer = document.createElement("div");
  questionContainer.setAttribute("class", "question-container");

  const questionTitle = document.createElement("div");
  questionTitle.className = "question-title-text";
  questionTitle.innerText = question.questionNumber + ") " + question.title;
  questionContainer.appendChild(questionTitle);

  if (question.type === "mcq") {
    let optionCount = 1;
    question.options.forEach((option) => {
      const optionContainer = document.createElement("div");
      optionContainer.className = "mcq-answer-option-container";

      const optionInput = document.createElement("input");
      optionInput.type = "checkbox";
      optionInput.id = `option-${optionCount}`;
      optionInput.name = `option-${optionCount}`;
      optionInput.value = option;
      optionContainer.appendChild(optionInput);

      const optionLabel = document.createElement("label");
      optionLabel.innerText = option;
      optionLabel.setAttribute("for", optionInput.id);

      optionContainer.appendChild(optionLabel);

      questionContainer.appendChild(optionContainer);
      optionCount++;
    });
  } else if (question.type === "scq") {
    let optionCount = 1;
    question.options.forEach((option) => {
      const optionContainer = document.createElement("div");
      optionContainer.className = "scq-option-answer-container";

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.id = `option-${optionCount}`;
      optionInput.name = `option-radio`;
      optionInput.value = option;

      const optionLabel = document.createElement("label");
      optionLabel.innerText = option;
      optionLabel.setAttribute("for", optionInput.id);

      optionContainer.appendChild(optionInput);
      optionContainer.appendChild(optionLabel);

      questionContainer.appendChild(optionContainer);

      optionCount++;
    });
  } else if (question.type === "numeric") {
    const answerInput = document.createElement("input");
    answerInput.type = "number";
    answerInput.name = question.id;
    answerInput.className = "answer-box";
    questionContainer.appendChild(answerInput);
  } else if (question.type === "file") {
    const answerInput = document.createElement("input");
    answerInput.type = "file";
    answerInput.accept = question.fileType;
    answerInput.name = question.id;
    answerInput.className = "answer-box";
    questionContainer.appendChild(answerInput);
  } else {
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.name = question.id;
    answerInput.className = "answer-box";
    questionContainer.appendChild(answerInput);
  }

  return questionContainer;
}

function collectResponses() {
  const responses = [];
  const questionContainers = document.querySelectorAll(".question-container");

  questionContainers.forEach((container) => {
    const questionId = container
      .querySelector(".question-title-text")
      .innerText.split(" ")[0];

    const inputs = container.querySelectorAll("input");

    const response = {
      questionId: questionId,
    };


    if(inputs.length === 1) {
        if(inputs[0].type === "text") {
            response.answerText = inputs[0].value;
        }
        else if(inputs[0].type === "number") {
            response.answerNumber = inputs[0].value;
        }
        else if(inputs[0].type === "file") {
            response.answerFile = inputs[0].value;
        }
    }
    else {
        const checkedInputs = getSelectedInputs(inputs);
        if(checkedInputs.length === 1) {
            response.answerScq = checkedInputs[0];
        }
        else {
            response.answerMcq = checkedInputs;
        }
    }

    responses.push(response);
  });

  return responses;
}

function getSelectedInputs(inputs) {
    const checkedElements = [];
    inputs.forEach(input => {
        if(input.checked) {
            checkedElements.push(input.value);
        }
    });

    return checkedElements;
}

async function submitSurveyResponse(responsePayload) {
  try {
    const response = await fetch(
      `${indexScriptModule.backendConnectionUrl}/surveyresponse/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responsePayload),
      }
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

export { getData };
