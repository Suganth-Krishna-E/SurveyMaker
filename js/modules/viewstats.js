import codeMaker from "../utils/codemaker.js";

async function fetchSurveyDetails(adminId) {
  const response = await fetch(
    `http://localhost:8080/surveydetail/${adminId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

async function displaySurveyStats(adminId) {
  const surveyDetails = await fetchSurveyDetails(adminId);
  console.log(adminId);
  const surveyStatsContainer = {
    tag: "div",
    attributes: { class: "survey-stats-container" },
    subTags: surveyDetails.map((survey, index) => ({
      tag: "div",
      attributes: { class: "survey-detail" },
      subTags: [
        {
          tag: "p",
          valueInsideTag: `Survey ID: ${survey.surveyId}`,
        },
        {
          tag: "h3",
          valueInsideTag: `Survey Title: ${survey.surveyTitle}`,
        },
      ],
    })),
  };

  const container = codeMaker.convertIntoHtml(surveyStatsContainer);

  return container;
}

export function getData() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminId = urlParams.get("adminId");
  return displaySurveyStats(adminId);
}
