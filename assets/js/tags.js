import { tagContainer, currentSearch } from "./variables";
import { search } from "./search";

// Array used to create tags
let researchTags = [];

/**
 * Define the behavior of tags that are displayed in item list of each sub search.
 * The principle is to use an array for each sub search (ingredients, appliances...) to create the item list and then on click push it in the array that create tags in tag container div.
 */ 

/**
 * Define HTML elements and style for tags
 * @param {string}
 */ 
const createTag = (label) => {
    const span = document.createElement('span');
    span.classList.add('tag', 'btn', 'btn-primary', 'btn-sm', 'mb-1', 'mr-3');
    span.innerHTML = label;
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('far', 'fa-times-circle');
    closeBtn.setAttribute('data-item', label);
    span.appendChild(closeBtn);
    return span;
};
  
// Reset to avoid cumulated tags
const reset = () => {
    document.querySelectorAll('.tag').forEach( tag =>{
        tag.parentElement.removeChild(tag);
    });
};

// Add tags in tag container with the right order
const addTags = () => {
    reset();
    researchTags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
};


/**
 * Remove tags of the array when you click on the cross
 */ 
document.addEventListener('click', (e) => {
    if(e.target.tagName == 'I') {
        const value = e.target.getAttribute('data-item');
        const indexTag = researchTags.indexOf(value);
        researchTags = [...researchTags.slice(0, indexTag), ...researchTags.slice(indexTag + 1)];
        console.log('after delete', researchTags)
        search(researchTags);
        addTags();
    };
});

/**
 * Add tags to arrays (the one that display tags and the one that filter the recipes)
 * @param {string}
 */ 
export const addEventToTag = (tag) => {
    tag.addEventListener('click', function(e){
        researchTags.push(tag.innerText);
        addTags();
        search(researchTags);
        console.log('tag click currentsearch', currentSearch)
    });
};


