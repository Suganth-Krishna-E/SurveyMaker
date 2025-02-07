const mcqQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'mcq-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'mcq-option-container dis-fl' },
            subTags: [
                { tag: 'textarea', attributes: { class: 'mcq-option-input', placeholder: 'Option 1' } }
            ]
        },
        { tag: 'button', attributes: { type: 'button', id: `mcq-option-adder-${id}`, class: 'add-option-btn' }, valueInsideTag: 'Add Option' },
        {
            tag: 'div',
            attributes: { class: 'answer-notes-container dis-fl space-evenly align-start' },
            subTags: [
                { tag: 'textarea', attributes: { class: 'answer-box', placeholder: 'Answer' } },
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes' } }
            ]
        }
    ]
});

export default mcqQuestion;
