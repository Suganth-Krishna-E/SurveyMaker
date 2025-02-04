import codeMaker from '../utils/codemaker.js';
import indexScriptModule from '../index-script.js';

const surveyModuleJson = {
    tag: "main",
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
    returnElement.querySelector("#create-survey-btn").addEventListener("click", () => {
        console.log("Create Survey button clicked");
        indexScriptModule.loadModule("createsurvey");
    });

    returnElement.querySelector("#fill-survey-btn").addEventListener("click", () => {
        console.log("Fill Survey button clicked");
        indexScriptModule.loadModule("fillSurvey");
    });

    returnElement.querySelector("#view-stats-btn").addEventListener("click", () => {
        console.log("View Stats button clicked");
        indexScriptModule.loadModule("surveyStats");
    });
}

export { getData };
