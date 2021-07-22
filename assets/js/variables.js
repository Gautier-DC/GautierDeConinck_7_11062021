import { recipes } from '/recipes.js'
//DOM Selector
export const tagContainer = document.querySelector('.tag-container');
export const mainsearchInput = document.querySelector('#main-search');
export const recipesSection = document.querySelector('#recipes');

export let dropdownItems = document.getElementsByClassName('dropdown-item');


//Array for sub search button
export let subsearchNames = ['Ingrédient', 'Appareils', 'Ustensiles'];

//Array for the search
export const currentSearch = [];

// Array used to create tags
export let researchTags = [];