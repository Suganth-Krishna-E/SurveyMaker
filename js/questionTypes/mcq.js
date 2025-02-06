const mcqQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'mcq-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'mcq-option-container dis-fl' },
            subTags: [
                { tag: 'textarea', attributes: { class: 'mcq-option-input', placeholder: 'Option 1', style: 'width: 70%; resize: none; overflow: hidden; height: auto; min-height: 10px;' } }
            ]
        },
        { tag: 'button', attributes: { type: 'button', id: `mcq-option-adder-${id}`, class: 'add-option-btn' }, valueInsideTag: 'Add Option' },
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

export default mcqQuestion;
