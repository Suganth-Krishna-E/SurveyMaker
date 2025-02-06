const fileQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'file-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'file-input-notes-container dis-fl align-start' },
            subTags: [
                { tag: 'input', attributes: { type: 'file', class: 'file-answer', style: 'flex: 70%' } },
                {
                    tag: 'select',
                    attributes: { style: 'flex: 30%' },
                    subTags: [
                        { tag: 'option', attributes: { value: 'pdf' }, valueInsideTag: 'PDF' },
                        { tag: 'option', attributes: { value: 'doc' }, valueInsideTag: 'DOC' },
                        { tag: 'option', attributes: { value: 'docx' }, valueInsideTag: 'DOCX' },
                        { tag: 'option', attributes: { value: 'jpg' }, valueInsideTag: 'JPG' },
                        { tag: 'option', attributes: { value: 'jpeg' }, valueInsideTag: 'JPEG' },
                        { tag: 'option', attributes: { value: 'png' }, valueInsideTag: 'PNG' },
                        { tag: 'option', attributes: { value: 'txt' }, valueInsideTag: 'TXT' },
                        { tag: 'option', attributes: { value: 'csv' }, valueInsideTag: 'CSV' }
                    ]
                },
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes', style: 'flex: 30%; height: 2.5rem; resize: none; overflow: hidden; height: auto; min-height: 10px;' } }
            ]
        }
    ]
});

export default fileQuestion;
