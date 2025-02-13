import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';

const surveyModuleJson = {
    tag: "div",
    attributes: {
        class: "main-container"
    },
    subTags: [
        {
            tag: "div",
            attributes: { id: "survey-container", class: "survey-container" },
            subTags: [
                {
                    tag: "button",
                    attributes: { id: "create-survey-btn", class: "survey-btn" },
                    valueInsideTag: "Create Survey"
                },
                {
                    tag: "button",
                    attributes: { id: "fill-survey-btn", class: "survey-btn" },
                    valueInsideTag: "Fill Survey"
                },
                {
                    tag: "button",
                    attributes: { id: "view-stats-btn", class: "survey-btn" },
                    valueInsideTag: "View Stats"
                }
            ]
        }
    ]
};

let returnElement;

function getData() {
    returnElement = codeMaker.convertIntoHtml(surveyModuleJson);
    attachEventHandlers();

    return returnElement;
}

function attachEventHandlers() {
    returnElement.querySelectorAll('li').forEach(element => {
        element.style.cursor = 'default';
    });

    returnElement.querySelector("#create-survey-btn").addEventListener("click", () => {
        indexScriptModule.loadModule("createsurvey");
    });

    returnElement.querySelector("#fill-survey-btn").addEventListener("click", () => {
        indexScriptModule.loadFillSurveyModule();
    });

    returnElement.querySelector("#view-stats-btn").addEventListener("click", () => {
        const adminId = document.getElementById('username-display').innerText;
        indexScriptModule.loadViewStatsPage(adminId);
    });
}

export { getData };
