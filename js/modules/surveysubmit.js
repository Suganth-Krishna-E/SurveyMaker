import codeMaker from "../utils/codemaker.js";

export function getData() {
  const urlParams = new URLSearchParams(window.location.search);
  const surveyId = urlParams.get("surveyId");
  const surveyTitle = urlParams.get("surveyTitle");

  const surveySubmitForm = {
    tag: "div",
    attributes: { class: "survey-submit-container" },
    subTags: [
      {
        tag: "h1",
        valueInsideTag: "Survey Published Successfully!"
      },
      {
        tag: "p",
        valueInsideTag: `Survey ID: ${surveyId}`
      },
      {
        tag: "p",
        valueInsideTag: `Survey Title: ${surveyTitle}`
      },
      {
        tag: "button",
        attributes: { id: "view-stats" },
        valueInsideTag: "View Survey Stats"
      }
    ]
  };

  const container = codeMaker.convertIntoHtml(surveySubmitForm);

  container.querySelector("#view-stats").addEventListener("click", () => {
    // window.location.href = `surveyStats.html?surveyId=${surveyId}`;
  });

  return container;
}

export default { getData };
