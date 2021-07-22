import { recipes } from '/recipes.js'
import {mainsearchInput} from './variables'
import {currentSearch, recipesSection} from './variables'
import { setRecipes } from './set_recipes';
import { cleanUpString } from './utils';
import { pushInArray, buildItemLists } from './tags';

/**
 * FIRST ALGORYTHME SEARCH
 * @param {inputfield} searchInput
 * Principle of this algorythme is a simple linear search.
 * On keyup 
 */
export const search = (searchInput) => {
  let filteredRecipes = recipes;
  currentSearch.splice(0, currentSearch.length);
  if(searchInput.value.length >= 3){
    cleanUpString(searchInput.value).split(' ').forEach( queryKeyword => currentSearch.push(queryKeyword));
    console.log('main search', currentSearch);
    currentSearch.forEach(keyword => {
      console.log('for each keyword', keyword, filteredRecipes)
      filteredRecipes = filteredRecipes.filter( recipe => {
        for (let i = 0; i < recipe.ingredients.length; i++){
          for (let j = 0; j < recipe.ustensils.length; j++){
            if (
              cleanUpString(recipe.name).includes(keyword) ||
              cleanUpString(recipe.appliance).includes(keyword) ||
              cleanUpString(recipe.ingredients[i].ingredient).includes(keyword) ||
              cleanUpString(recipe.ustensils[j]).includes(keyword) ||
              cleanUpString(recipe.description).includes(keyword)
            ) {
              return true;
            } else {            
              return false;
            }
          };
        };
      });
      console.log('instant t', keyword, filteredRecipes)
    });
    setRecipes(filteredRecipes);
    pushInArray(filteredRecipes);
    buildItemLists();
    if (recipesSection.childNodes.length == 0){
      let errorMsg = document.createElement('p');
      errorMsg.classList.add('recipes__errormsg', 'col','font-weight-bold', 'text-center');
      errorMsg.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
      recipesSection.appendChild(errorMsg);
    };
  } else {
    setRecipes(filteredRecipes);
    pushInArray(filteredRecipes);
    buildItemLists();
  };
};