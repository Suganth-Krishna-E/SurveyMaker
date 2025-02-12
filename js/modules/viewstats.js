import codeMaker from "../utils/codemaker.js";
import indexScriptModule from '../index-script.js';

const viewStatsPage = {
  tag: 'div',
  attributes: {
    class: 'main-container'
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
    }
  ]
};

const urlParams = new URLSearchParams(window.location.search);
const adminId = urlParams.get("adminId");


async function fetchSurveyStats(adminId) {
  try {
    const response = await fetch(`http://localhost:8080/surveydetail/${adminId}`);
    const surveys = await response.json();
    return surveys;
  } catch (error) {
    console.error("Error fetching survey stats:", error);
    return [];
  }
}

function displaySurveyStats(surveys) {
  const divBody = document.createElement('div');
  divBody.setAttribute('class', 'stats-body');

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
  const adminId = document.getElementById('username-display').innerText;
  const surveys = await fetchSurveyStats(adminId);

  formElement.appendChild(displaySurveyStats(surveys));
  
  return formElement;
}

export function attachEventListeners() {
  const surveyStatsContainer = document.querySelectorAll('.survey-stats-container');
  
  const stats = document.querySelectorAll('div');


  setTimeout(() => {
    const stats = document.querySelectorAll('div');

  }, 2000);


  const surverBodyContainer = surveyStatsContainer[0].children;



  surverBodyContainer.forEach((element) => {
  })

  const surveyDetails = surverBodyContainer.querySelectorAll('.survey-stat');

  

  surveyDetails.forEach((surveyStat) => {
    if(true) {
      surveyStat.addEventListener('click', () => {
        indexScriptModule.loadSurveyDetails(surveyStat.querySelector('h3').innerText);
      });
    }
    
  });
}

export async function getData() {
  const formElement = codeMaker.convertIntoHtml(viewStatsPage);
  await getDataFilled(formElement)
  .then((value) => {
    return value;
  })
  .catch(err => {
    return err;
  });

  return formElement;
}

export default { getData, attachEventListeners };
