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

async function fetchSurveyStats(adminId) {
  try {
    const response = await fetch(
      `${indexScriptModule.backendConnectionUrl}/surveydetail/${adminId}`
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

  return formElement;
}

export function attachEventListeners() {
  const surveyStatsContainer = document.querySelectorAll(".survey-stat");

  surveyStatsContainer.forEach((element) => {
    element.addEventListener('mouseover', () => {
      element.style.cursor = 'pointer';
    });

    element.addEventListener('click', () => {
      indexScriptModule.loadSurveyDetails(element.childNodes[1].innerText);
    });
  })
}

export async function getData() {
  const formElement = codeMaker.convertIntoHtml(viewStatsPage);
  await getDataFilled(formElement);

  return formElement;
}

export default { getData, attachEventListeners };
