const fileQuestion = (id) => ({
    tag: 'div',
    attributes: { class: 'file-answer-container' },
    subTags: [
        {
            tag: 'div',
            attributes: { class: 'file-input-wrapper dis-fl', style: 'flex: 70%' },
            subTags: [
                {
                    tag: 'div',
                    attributes: { class: 'file-input-container dis-fl' },
                    subTags: [
                        { tag: 'input', attributes: { type: 'file', class: 'file-answer', style: 'flex: 100%', disabled: true, multiple: true } }
                    ]
                },
                {
                    tag: 'div',
                    attributes: { class: 'file-type-container dis-fl wrap' },
                    subTags: [
                        {
                            tag: 'select',
                            attributes: { class: 'file-type-select', style: 'flex: 70%' },
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
                        { tag: 'input', attributes: { type: 'text', class: 'other-file-type', style: 'flex: 30%', placeholder: 'Other file type' } }
                    ]
                }
            ]
        },
        {
            tag: 'div',
            attributes: { class: 'answer-notes-container' },
            subTags: [
                { tag: 'textarea', attributes: { class: 'notes-input', id: `notes-${id}`, placeholder: 'Notes (optional)' } }
            ]
        },
    ]
});

export default fileQuestion;
