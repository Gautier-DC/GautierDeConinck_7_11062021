import { searchRecipes } from '.';
import {mainsearchInput, researchTags} from './variables';
import {recipesSection} from './variables';
import { setRecipes } from './set_recipes';
import { cleanUpString } from './utils';
import { pushInArray, buildItemLists } from './sub_searchs';
import { setErrorMsg } from './inner_html_render';

/**
 * FIRST ALGORYTHME SEARCH
 * @param {Array} currentSearch - setup empty by default.
 * Principle of this algorythme is a simple linear search.
 * Use the current search array to setup the search function and push your research after being cleaned by the fonction CleanUpString. (whenever it comes from the main or sub searchs)
 * Then for do a loop forEach keyword, and check in fields of recipes (with filter and include fonctions) if the different currentSearch values match.
 * Finally display the recipes and the right item list in the different sub searchs with the right functions
 */
export const search = (currentSearch = []) => {
  let filteredRecipes = searchRecipes;
  researchTags.forEach(tag => currentSearch.push(tag));
  currentSearch.map(keyword => cleanUpString(keyword));
  if(mainsearchInput.value.length >= 3 || currentSearch.length >= 1){
    console.log('Is it clean ?', cleanUpString(mainsearchInput.value))
    cleanUpString(mainsearchInput.value).split(' ').forEach(queryKeyword => queryKeyword.length != 0 ? currentSearch.push(queryKeyword) : null);
    currentSearch.forEach(keyword => {
      filteredRecipes = filteredRecipes.filter( recipe => {
      let start = 0;
      let end = recipe.searchField.length - 1;
      let middle = Math.floor((start + end)/2);
        while (start <= end){
          if (recipe.searchField[middle].includes(keyword)){
            return true;
          } else if (recipe.searchField[middle] < keyword) {
            start = middle + 1;
          } else {
            end = middle - 1;
          }
          middle = Math.floor((start + end)/2);
        }
      });
    });
    setRecipes(filteredRecipes);
    pushInArray(filteredRecipes);
    buildItemLists();
    if (recipesSection.childNodes.length == 0){
      setErrorMsg();
    };
  } else {
    setRecipes(filteredRecipes);
    pushInArray(filteredRecipes);
    buildItemLists();
  };
};