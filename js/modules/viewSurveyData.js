import indexScriptModule from "../index-script.js";
import codemaker from "../utils/codemaker.js";

const viewSurveyData = {
  tag: "div",
  attributes: {
    class: "main-container",
  },
};

async function getResponses(surveyId) {
  try {
    const response = await fetch(
      `${indexScriptModule.backendConnectionUrl}/surveyresponse/getResponsesBySurveyId/${surveyId}`
    );

    if (response.status !== 200) {
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        const decoder = new TextDecoder();
        const str = decoder.decode(value);

        return {
            errorObject: str,
          };
      }
    } else {
      const responses = await response.json();
      return responses;
    }
  } catch (error) {
    return {
      errorObject: error,
    };
  }
}

async function getSurveyDetails(surveyId) {
  try {
    const response = await fetch(
      `${indexScriptModule.backendConnectionUrl}/surveydetail/getSurveyById/${surveyId}`
    );

    if (response.status !== 200) {
        const reader = response.body.getReader();
  
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          const decoder = new TextDecoder();
          const str = decoder.decode(value);
  
          return {
              errorObject: str,
            };
        }
      } else {
        const responses = await response.json();
        return responses;
      }
  } catch {
    return {
      errorObject: error,
    };
  }
}

function getTable(surveyDetails, responses) {
  const tableElement = document.createElement("table");
  tableElement.setAttribute("class", "response-table");

  const titleRow = document.createElement("tr");
  titleRow.setAttribute("class", "title-row");
  const titleHeader = document.createElement("th");
  titleHeader.colSpan = surveyDetails.questions.length + 1;
  titleHeader.innerText = surveyDetails.title;

  titleRow.appendChild(titleHeader);
  tableElement.appendChild(titleRow);

  const questionRow = getQuestionRow(
    surveyDetails.questions,
    surveyDetails.surveyId
  );

  tableElement.appendChild(questionRow);

  responses.forEach((response) => {
    const responseRowTr = getResponsesRow(response);
    tableElement.appendChild(responseRowTr);
  });

  return tableElement;
}

function getResponsesRow(response) {
  const responseRow = document.createElement("tr");

  const responseIdTd = document.createElement("td");
  responseIdTd.innerText = response.responseId;

  responseRow.appendChild(responseIdTd);

  response.answers.forEach((answer) => {
    const answerDataTd = document.createElement("td");
    if (answer.answerText != null) {
      answerDataTd.innerText = answer.answerText;
    } else if (answer.answerScq != null) {
      answerDataTd.innerText = answer.answerScq;
    } else if (answer.answerMcq != null) {
      answer.answerMcq.forEach((option) => {
        answerDataTd.innerText += option;
      });
    } else if (answer.answerNumber != null) {
      answerDataTd.innerText = answer.answerNumber;
    } else {
      answerDataTd.innerText = answer.answerFile;
    }
    responseRow.appendChild(answerDataTd);
  });

  return responseRow;
}

function getQuestionRow(questions, surveyId) {
  const questionRow = document.createElement("tr");

  const surveyIdTh = document.createElement("th");
  surveyIdTh.innerText = surveyId;

  questionRow.appendChild(surveyIdTh);

  questions.forEach((question) => {
    const questionElement = document.createElement("th");
    questionElement.innerText = question.title;

    questionRow.appendChild(questionElement);
  });

  return questionRow;
}

async function getData() {
  const resultElement = codemaker.convertIntoHtml(viewSurveyData);
  const urlParams = new URLSearchParams(window.location.search);
  const surveyId = urlParams.get("surveyId");

  const surveyDetails = await getSurveyDetails(surveyId);
  const responses = await getResponses(surveyId);

  let tableElement;

  if (!surveyDetails.errorObject) {
    if (!responses.errorObject) {
      tableElement = getTable(surveyDetails, responses);
    } else {
      swal("Error", responses.errorObject, "warning");
    }
  } else {
    swal("Error", surveyDetails.errorObject, "warning");
  }

  if (tableElement) {
    resultElement.appendChild(tableElement);
  }

  return resultElement;
}

export { getData };
