const numericQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'numeric-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'answer-notes-container dis-fl space-evenly align-start' },
            subTags: [
                { tag: 'input', attributes: { type: 'number', class: 'answer-numeric', placeholder: 'Answer' } },
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes' } }
            ]
        }
    ]
});

export default numericQuestion;