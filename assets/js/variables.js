//DOM Selector
export const tagContainer = document.querySelector('.tag-container');
export const mainsearchInput = document.querySelector('#main-search');
export const recipesSection = document.querySelector('#recipes');

export let dropdownItems = document.getElementsByClassName('dropdown-item');


// Array for sub search sections
export let subsearchNames = [
    {
        'label': 'Ingrédients',
        'name': 'ingredients' 
    },
    {
        'label': 'Ustensiles',
        'name': 'ustensils' 
    },
    {
        'label': 'Appareils',
        'name': 'appliances' 
    }
]

// Array for the tags
export const researchTags = [];
