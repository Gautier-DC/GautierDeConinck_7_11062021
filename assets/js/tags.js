import { tagContainer, researchTags } from "./variables";
import { search } from "./algoB";
import { cleanUpString } from "./utils";

/**
 * Define the behavior of tags that are displayed in item list of each sub search.
 * The principle is to use an array for each sub search (ingredients, appliances...) to create the item list and then on click push it in the array that create tags in tag container div.
 */ 

/**
 * Define HTML elements and style for tags
 * @param {string} label
 * @param {string} color
 */ 
const createTag = (label, color) => {
    const span = document.createElement('span');
    span.classList.add('tag', 'btn', color, 'btn-sm', 'mb-1', 'mr-3');
    span.innerHTML = label;
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('far', 'fa-times-circle');
    closeBtn.setAttribute('data-item', cleanUpString(label));
    span.appendChild(closeBtn);
    return span;
};
  
/**
 * Add tags to arrays (the one that display tags and the one that filter the recipes)
 * @param {string}
 */ 
export const addEventToTag = (tag) => {
    tag.addEventListener('click', function(e){
        let color = tag.getAttribute('data-color');
        researchTags.push(cleanUpString(tag.innerText));
        tagContainer.append(createTag(tag.innerText, color));
        search();
    });
};


/**
 * Remove tags of the array when you click on the cross
 */ 
document.addEventListener('click', (e) => {
    if(e.target.tagName == 'I') {
        const value = e.target.getAttribute('data-item');
        const indexTag = researchTags.indexOf(value);
        researchTags.splice(indexTag, 1);
        e.target.parentElement.remove(e);
        search();
    };
});



