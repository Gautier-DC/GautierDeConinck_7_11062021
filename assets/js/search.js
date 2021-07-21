import { recipes } from '/recipes.js'
import {mainsearchInput} from './variables'
import {recipesSection} from './variables'
import {currentSearch} from './variables'
import { setRecipes } from './set_recipes';
import { cleanUpString } from './utils';
import { pushInArray } from './tags';
import { buildItemLists} from './tags';

// FIRST ALGORYTHME SEARCH

// Main search
let filteredRecipes = recipes;
export function search () {
  mainsearchInput.onkeyup = () => {
      currentSearch.push(cleanUpString(mainsearchInput.value).split(' '));
      console.log('main search', currentSearch);
      currentSearch.forEach(keyword => {
        console.log('for each keyword', keyword)
        if(mainsearchInput.value.length >= 3){
          filteredRecipes = recipes.filter( recipe => {
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
          filteredRecipes = recipes;
          setRecipes(filteredRecipes);
          pushInArray(filteredRecipes);
          buildItemLists();
        };
      });
  };
}