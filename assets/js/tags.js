import { recipes } from '/recipes.js'
import { researchTags } from "./variables";
import { tagContainer } from "./variables";
import { currentSearch } from "./variables";

//Arrays for items lists
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

/**
 * Define the behavior of tags that are displayed in item list of each sub search.
 * The principle is to use an array for each sub search (ingredients, appliances...) to create the item list and then on click push it in the array that create tags in tag container div.
 */ 

/**
 * Define elements and style for tags
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
        const index = researchTags.indexOf(value);
        researchTags = [...researchTags.slice(0, index), ...researchTags.slice(index + 1)];
        addTags();
    };
});

/**
 * Add tags to arrays (the one that display tags and the one that filter the recipes)
 * @param {string}
 */ 
const addEventToTag = (tag) => {
    tag.addEventListener('click', function(e){
        researchTags.push(tag.innerText);
        currentSearch.push(tag.innerText);
        addTags();
    });
};


/**
 * ITEM LIST OF EACH SUB SEARCH SECTION
 * Add item list in each sub search (max 30 items)
 */

/**
 * Define a maximum of 30 items
 * @param {array}
 */ 
const ulLength = (array) =>{
    return(array.length > 30 ? 30 : array.length);
};
  
/**
 * Push items list in their respective array
 * @param {array} displayedRecipes - use only recipes that match any research done before
 * don't forget to reset arrays of each sub search at the beginning
 */ 
export const pushInArray = (displayedRecipes) => {
    ingredientsArray = [];
    appliancesArray = [];
    ustensilsArray = [];
    console.log(displayedRecipes)
    displayedRecipes.forEach(recipe => {
        recipe.ingredients.forEach((currentIngredient) => {
        ingredientsArray.push(currentIngredient.ingredient);
        });
        appliancesArray.push(recipe.appliance);
        recipe.ustensils.forEach((currentUstensil) => {
        ustensilsArray.push(currentUstensil);
        });
    });
    // Filter duplicate tags
    ingredientsArray = [...new Set(ingredientsArray)];
    appliancesArray = [...new Set(appliancesArray)];
    ustensilsArray = [...new Set(ustensilsArray)];
} ;

/**
 * Use each sub search arrays in order to create their respective item list.
 * First reset the section, then you create the element, after that set all attributes, define inner HTML and finally append it in the right section.
 */
export const buildItemLists = () => {
    console.log(document.getElementById('Ingrédient__taglist'))
    document.getElementById('Ingrédient__taglist').innerHTML = '';
    for (let i = 0; i < ulLength(ingredientsArray); i++){
        let ingTag = document.createElement('li');
        ingTag.classList.add('dropdown-item');
        ingTag.setAttribute('aria-selected', 'false');
        ingTag.setAttribute('role', 'option');
        ingTag.innerHTML = ingredientsArray[i];
        document.getElementById('Ingrédient__taglist').append(ingTag);
        addEventToTag(ingTag);
    };
    document.getElementById('Appareils__taglist').innerHTML = '';
    for (let i = 0; i < ulLength(appliancesArray); i++){
        let aplTag = document.createElement('li');
        aplTag.classList.add('dropdown-item');
        aplTag.setAttribute('aria-selected', 'false');
        aplTag.setAttribute('role', 'option');
        aplTag.innerHTML = appliancesArray[i];
        document.getElementById('Appareils__taglist').append(aplTag);
        addEventToTag(aplTag);
    };
    document.getElementById('Ustensiles__taglist').innerHTML = '';
    for (let i = 0; i < ulLength(ustensilsArray); i++){
        let ustTag = document.createElement('li');
        ustTag.classList.add('dropdown-item');
        ustTag.setAttribute('aria-selected', 'false');
        ustTag.setAttribute('role', 'option');
        ustTag.innerHTML = ustensilsArray[i];
        document.getElementById('Ustensiles__taglist').append(ustTag);
        addEventToTag(ustTag);
    };
};