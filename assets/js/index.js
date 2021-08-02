import 'bootstrap';

// Import
import { recipes } from '/recipes.js'
import { search } from './algoB';
import { setRecipes } from './set_recipes';
import { subsearchNames, mainsearchInput } from './variables';
import { buildSubsearchBtn,  pushInArray, buildItemLists } from './sub_searchs';
import { cleanUpString } from './utils';

/**
 * Create a key/value that contains all the corresponding field for the search
 * @param {object} recipe 
 * @returns 
 */
const createSearchField = (recipe) => {
    let searchField = cleanUpString(recipe.name + " " + recipe.description + " " + recipe.ingredients.map((i) => i.ingredient).join(" "));
    return searchField
};

export const searchRecipes = recipes.map((recipe) => ({...recipe, searchField: createSearchField(recipe)}));
console.log('index',searchRecipes);

setRecipes(recipes);
pushInArray(recipes);
buildSubsearchBtn(subsearchNames);
buildItemLists();
mainsearchInput.addEventListener("keyup", e => { search()});
