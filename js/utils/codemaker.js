function convertIntoHtml(data) {
    if(data !== undefined) {
        if(data.tag !== undefined) {
            const rootTag = document.createElement(data.tag);
            for(const [key, value] of Object.entries(data)) {
                if(key === 'tag') {
                    continue;
                }
                else if(key === 'subTags') {
                    for(const child of value) {
                        rootTag.appendChild(convertIntoHtml(child));
                    }
                }
                else if(key === 'valueInsideTag') {
                    rootTag.innerText = value;
                }
                else if(key === 'attributes') {
                    for(const attval in value) {
                        if(attval === 'required') {
                            // rootTag.setAttribute('required', 'required');
                        }
                        else {
                            rootTag.setAttribute(attval, value[attval]);
                        }
                    }
                }
            }
            return rootTag;
        }
        else if(data.subDataElements) {
            const rootTag = document.createElement('div');
            for(const subData of data.subDataElements) {
                rootTag.appendChild(convertIntoHtml(subData));
            }
            return rootTag;
        }
        else {
            const returnElement = document.createElement('p');
            returnElement.innerText = 'No tag key found or no elements found';
            return returnElement;
        }
    }
    else {
        const returnElement = document.createElement('p');
        returnElement.innerText = 'Value given is undefined';
        return returnElement;
    }
}

export default { convertIntoHtml };