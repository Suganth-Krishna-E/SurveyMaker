const scqQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'scq-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'scq-option-container dis-fl' },
            subTags: [
                { tag: 'input', attributes: { type: 'radio', class: 'scq-choice', name: `scq-group-${id}`, disabled: true } },
                { tag: 'textarea', attributes: { class: 'scq-option-input', placeholder: 'Option 1', style: 'width: 70%; resize: none; overflow: hidden; height: auto; min-height: 10px;' } }
            ]
        },
        { tag: 'button', attributes: { type: 'button', id: `scq-option-adder-${id}`, class: 'add-option-btn' }, valueInsideTag: 'Add Option' },
        {
            tag: 'div',
            attributes: { class: 'answer-notes-container dis-fl space-evenly align-start' },
            subTags: [
                { tag: 'textarea', attributes: { class: 'answer-box', placeholder: 'Answer', style: 'resize: none; overflow: hidden; height: auto; min-height: 10px;' } },
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes', style: 'height: 2.5rem; resize: none; overflow: hidden; height: auto; min-height: 10px;' } }
            ]
        }
    ]
});

export default scqQuestion;
