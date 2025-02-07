const scqQuestion = (id) => ({
  tag: "div",
  attributes: { class: "scq-answer-container" },
  subTags: [
    {
      tag: "div",
      attributes: { class: "scq-option-container dis-fl" },
      subTags: [
        {
          tag: "button",
          attributes: {
            type: "button",
            id: `scq-option-adder-${id}`,
            class: "add-option-btn",
          },
          valueInsideTag: "Add Option",
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        class: "answer-notes-container dis-fl space-evenly align-start",
      },
      subTags: [
        {
          tag: "textarea",
          attributes: {
            class: "notes-input",
            id: `notes-${id}`,
            placeholder: "Notes (optional)",
          },
        },
      ],
    },
  ],
});

export default scqQuestion;
