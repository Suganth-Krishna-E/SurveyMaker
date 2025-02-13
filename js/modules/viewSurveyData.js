import indexScriptModule from "../index-script.js";
import codemaker from "../utils/codemaker.js";

const viewSurveyData = {
    tag: 'div',
    attributes: {
        class: 'main-container'
    },
    subTags: [
        {
            tag: 'div',
            attributes: {
                class: 'survey-details-container'
            },
            subTags: [
                {
                    tag: 'h2',
                    attributes: {
                        class: 'survey-title-container'
                    }
                },
                {
                    tag: 'h4',
                    attributes: {
                        class: 'survey-description-container'
                    }
                }
            ]
        },
        {
            tag: 'div',
            attributes: {
                class: 'responses-container'
            }
        },
        {
            tag: 'div',
            attributes: {
                class: 'pagination-container'
            }
        }
    ]
};

const urlParams = new URLSearchParams(window.location.search);
const surveyId = urlParams.get('surveyId');

async function getSurveyDetails(surveyId) {
    try {
        const response = await fetch(`${indexScriptModule.backendConnectionUrl}/surveyresponse/getResponsesBySurveyId/${surveyId}`);

        console.log(response);

        if(response.status !== 200) {
            swal('Error', response.body, 'warning');
        }
        else {
            const surveyDetails = await response.json();
            console.log(surveyDetails);
        }
        
    }
    catch(error) {
        console.log(error);
        swal('Error', 'There was and error from server', 'warning');
    }
}

async function getData() {
    const resultElement = codemaker.convertIntoHtml(viewSurveyData);

    await getSurveyDetails(surveyId);

    return resultElement;
}

export { getData };