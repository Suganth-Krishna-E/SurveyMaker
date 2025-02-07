const textQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'text-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'answer-notes-container dis-fl space-evenly align-start' },
            subTags: [
                { tag: 'textarea', attributes: { class: 'answer-box', placeholder: 'Answer', disabled: true } },
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes' } }
            ]
        }
    ]
});

export default textQuestion;
