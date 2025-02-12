// const simpleTagWithChildElement = {
//     subDataElements: [
//         {
//             tag: 'p',
//             valueInsideTag: 'Hello this is sample'
//         },
//         {
//             tag: 'p',
//             valueInsideTag: 'Hello this is sample'
//         },
//     ]
// };

// console.log(simpleTagWithChildElement);


// const convertedElementHtml = convertIntoHtml(dataInput);

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
                else if(key === 'validations') {
                    // addCustomValidation(value.validationName, value.errorMessage, rootTag,);
                }
                else {
                    // rootTag.setAttribute(key, value);
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
            console.log("No tag key found");
            const returnElement = document.createElement('p');
            returnElement.innerText = 'No tag key found or no elements found';
            return returnElement;
        }
    }
    else {
        console.error("Value given is undefined");
        const returnElement = document.createElement('p');
        returnElement.innerText = 'Value given is undefined';
        return returnElement;
    }
}

export default { convertIntoHtml };

// function addCustomValidation(validationName, errorMessage = 'Invalid format', rootTag) {
//     if(validationName === 'indian-pincode') {
//         rootTag.addEventListener("blur", () => {
//             if(/^[1-9][0-9]{5}$/.test(rootTag.value)) {
//                 console.log("Valid Pincode");
//                 rootTag.setCustomValidity('');
//             }
//             else {
//                 console.log("Invalid Pincode");
//                 rootTag.setCustomValidity(errorMessage);
//             }
//         });
//     }
// }

// console.log(convertedElementHtml);  

// document.getElementById("mainDiv").appendChild(convertedElementHtml);
