function formatSurvey(survey) {
    return survey.map(question => {
        switch (question.Type) {
            case 'text':
            case 'numeric':
                return {
                    Title: question.Title,
                    Type: question.Type
                };
            case 'mcq':
            case 'scq':
                return {
                    Title: question.Title,
                    Type: question.Type,
                    Options: question.Options ? question.Options.filter(option => option.trim().toLowerCase() !== 'notes') : [],
                    Notes: question.Notes || ''
                };
            case 'file':
                return {
                    Title: question.Title,
                    Type: question.Type
                };
            default:
                return {};
        }
    });
}

const survey = [
    { Title: 'Question 1', Type: 'text', Notes: 'Some notes' },
    { Title: 'Question 2', Type: 'mcq', Options: ['Option 1', 'Option 2', 'Option 3'], Notes: 'Some notes' },
    { Title: 'Question 3', Type: 'numeric', Notes: 'Some notes' },
    { Title: 'Question 4', Type: 'file', Format: 'pdf', Notes: 'Some notes' }
];

console.log(formatSurvey(survey));
