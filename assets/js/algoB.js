import { searchRecipes } from ".";
import { mainsearchInput, researchTags } from "./variables";
import { recipesSection } from "./variables";
import { setRecipes } from "./set_recipes";
import { cleanUpString } from "./utils";
import { pushInArray, buildItemLists } from "./sub_searchs";
import { setErrorMsg } from "./inner_html_render";

/**
 * SECOND ALGORYTHME SEARCH
 * @param {Array} currentSearch - setup empty by default.
 * Principle of this algorythme is a simple binary search.
 * Use the current search array to setup the search function and push your research after being cleaned by the fonction CleanUpString. (whenever it comes from the main or sub searchs)
 * Thanks to the ceateSearchField function, do a forEach in the currentSearch array and start the binary search.
 * Because Search field is in alphabetical order, you can set a start, an end and a middle. Check if the middle include the search and if it's not the case reset end and start, then restart again.
 */
export const search = (currentSearch = []) => {
  let filteredRecipes = searchRecipes;
  researchTags.forEach((tag) => currentSearch.push(tag));
  currentSearch.map((keyword) => cleanUpString(keyword));
  if (mainsearchInput.value.length >= 3 || currentSearch.length >= 1) {
    cleanUpString(mainsearchInput.value)
      .split(" ")
      .forEach((queryKeyword) => (queryKeyword.length != 0 ? currentSearch.push(queryKeyword) : null));
    currentSearch.forEach((keyword) => {
      filteredRecipes = filteredRecipes.filter((recipe) => {
        let start = 0;
        let end = recipe.searchField.length - 1;
        let middle = Math.floor((start + end) / 2);
        while (start <= end) {
          if (recipe.searchField[middle].includes(keyword)) {
            return true;
          } else if (recipe.searchField[middle] < keyword) {
            start = middle + 1;
          } else {
            end = middle - 1;
          }
          middle = Math.floor((start + end) / 2);
        }
      });
    });
    setRecipes(filteredRecipes);
    pushInArray(filteredRecipes);
    buildItemLists();
    if (recipesSection.childNodes.length == 0) {
      setErrorMsg();
    }
  } else {
    setRecipes(filteredRecipes);
    pushInArray(filteredRecipes);
    buildItemLists();
  }
};
