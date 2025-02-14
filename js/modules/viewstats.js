import codeMaker from "../utils/codemaker.js";
import indexScriptModule from "../index-script.js";

const viewStatsPage = {
  tag: "div",
  attributes: {
    class: "main-container",
  },
  subTags: [
    {
      tag: "div",
      attributes: { class: "survey-stats-container" },
      subTags: [
        {
          tag: "div",
          attributes: { class: "stats-header" },
          subTags: [
            {
              tag: "h2",
              valueInsideTag: "Survey Statistics",
            },
          ],
        },
      ],
    },
  ],
};

const urlParams = new URLSearchParams(window.location.search);
const adminId = urlParams.get("adminId");

async function getTotalPages(adminId) {
  try {
    const totalSurveys = await fetch(
      `${indexScriptModule.backendConnectionUrl}/surveydetail/getSurveyCount/${adminId}`
    );

    if (totalSurveys.status !== 200) {
      const reader = totalSurveys.body.getReader();

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
      const responses = await totalSurveys.json();
      return responses;
    }
  } catch(error) {
    return {
      errorObject: error,
    };
  }
}

async function getSurveyByPage(pageNumber, adminId) {

  try {
      const response = await fetch(
        `${indexScriptModule.backendConnectionUrl}/surveydetail/${adminId}/${pageSize}/${pageNumber}`
      );
  
      if (response.status !== 200) {
        const errorMessage = await response.json();
        swal("No data found", errorMessage, "warning");
      } else {
        const surveys = await response.json();
  
        if (surveys.length < 1) {
          swal(
            "No records found",
            "There are zero records found for given andminId",
            "error"
          );
        }
  
        return surveys;
      }
    } catch (error) {
      swal(
        "No data found",
        "The surveys for corresponding admin is not found",
        "warning"
      );
      return [];
    }
}

async function fetchSurveyStats(adminId) {

  const totalSurveys = await getTotalPages(adminId);

  const pageNumber = 1;

  const surveysFirstPage = await getSurveyByPage(pageNumber, adminId);

  if (!totalSurveys.errorObject) {
    if (!surveysFirstPage.errorObject) {
      totalSurveysGlobal = totalSurveys;
    } else {
      swal("Error", surveysFirstPage.errorObject, "warning");
    }
  } else {
    swal("Error", totalSurveys.errorObject, "warning");
  }

  return surveysFirstPage;

}

async function getTotalPagesUpdated() {
  const totalSurveys = await getTotalPages(adminId);

  if(!totalSurveys.errorObject) {
    totalSurveysGlobal = totalSurveys;
  }
}

function displaySurveyStats(surveys) {
  const divBody = document.createElement("div");
  divBody.setAttribute("class", "stats-body");

  surveys.forEach((survey) => {
    const surveyElement = codeMaker.convertIntoHtml({
      tag: "div",
      attributes: { class: "survey-stat" },
      subTags: [
        {
          tag: "h3",
          valueInsideTag: survey.surveyTitle,
        },
        {
          tag: "p",
          valueInsideTag: survey.surveyId,
        },
      ],
    });
    divBody.appendChild(surveyElement);
  });

  return divBody;
}

async function getDataFilled(formElement) {
  const adminId = document.getElementById("username-display").innerText;
  const surveys = await fetchSurveyStats(adminId);

  formElement.appendChild(displaySurveyStats(surveys));

  getTotalPagesUpdated();

  const pageNumberElement = getPageNumberElement();

  formElement.appendChild(pageNumberElement)

  return formElement;
}

function getPageNumberElement() {
  const pageNumberFooter = {
    tag: 'div',
    attributes: {
      class: 'page-number-footer'
    },
  }

  const pageNumberParentContainer = codeMaker.convertIntoHtml(pageNumberFooter);

  for(let i = 0; i < totalSurveysGlobal / pageSize; i++) {
    const pageNumberContainer = document.createElement('div');
    pageNumberContainer.innerText = i;
    pageNumberParentContainer.appendChild(pageNumberContainer);
  }

  return pageNumberParentContainer;

}

export function attachEventListeners() {
  const surveyStatsContainer = document.querySelectorAll(".survey-stat");

  surveyStatsContainer.forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.style.cursor = "pointer";
    });

    element.addEventListener("click", () => {
      indexScriptModule.loadSurveyDetails(element.childNodes[1].innerText);
    });
  });

  const inputs = document.querySelectorAll('.page-number-footer div');

  inputs[0].style.background = 'green';

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('click', () => {
      inputs.forEach(element => {
        element.style.background = "none";
      });
      changeDataToNewPageNumber(Number(inputElement.innerText) + 1);
      inputElement.style.background = "green";
    });
  });
}

function changeDataToNewPageNumber(newPageNumber) {
  const mainContainer = document.querySelector('.main-container');

  getSurveyByPage(newPageNumber, adminId)
  .then(res => {
    mainContainer.replaceChild(displaySurveyStats(res), mainContainer.querySelector('.stats-body'));
  });
  
}

const pageSize = 2;
let totalSurveysGlobal = 0;

export async function getData() {
  const formElement = codeMaker.convertIntoHtml(viewStatsPage);
  await getDataFilled(formElement);

  return formElement;
}

export default { getData, attachEventListeners };
