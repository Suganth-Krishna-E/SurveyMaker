import codemaker from "../utils/codemaker";

const viewSurveyData = {
    tag: 'div',
    attributes: {
        class: 'survey-data-view-container'
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
console.log(`View survey Details called for ${surveyId}`);

async function getSurveyDetails(surveyId) {
    try {
        const response = await fetch(`http://localhost:8080/surveydetail/getSurveyById/${surveyId}`);
        const surveyDetails = await response.json();
        console.log(surveyDetails);
    }
    catch(error) {
        swal('Error', 'There was and error from server', 'warning');
    }
}

export function getData() {
    const resultElement = codemaker.convertIntoHtml(viewSurveyData);

    return resultElement;
}