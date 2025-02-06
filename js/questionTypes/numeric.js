const numericQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'numeric-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'answer-notes-container dis-fl space-evenly align-start' },
            subTags: [
                { tag: 'input', attributes: { type: 'number', class: 'answer-numeric', placeholder: 'Answer', style: 'resize: none; overflow: hidden; height: auto; min-height: 10px;' } },
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes', style: 'height: 2.5rem; resize: none; overflow: hidden; height: auto; min-height: 10px;' } }
            ]
        }
    ]
});

export default numericQuestion;