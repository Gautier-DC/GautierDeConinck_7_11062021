import { researchTags, subsearchNames } from "./variables";
import { search } from "./algoB";
import { cleanUpString } from "./utils";
import { setOpenAtt, setSubBloc, removeOpen, setItemAtt } from "./inner_html_render";

//Arrays for items lists
const filtersData = {
  ingredientsArr: [],
  appliancesArr: [],
  ustensilsArr: [],
};

/**
 * CREATE SUB SEARCH BUTTON and define his behavior.
 * Use a factory method in order to create possible new sub search easily
 */

/**
 * Build all sub searchs parts
 * @param {string} subsearchList
 */
export const buildSubsearchBtn = (subsearchList) => {
  subsearchList.forEach((elt) => {
    let subsearchBloc = document.createElement("div");
    setSubBloc(subsearchBloc, elt);
    /**
     * Show tag list in sub searchs and transform the button into search input field
     */
    const currentButton = subsearchBloc.querySelector(".sub-search__button");
    let inputField = subsearchBloc.querySelector(".sub-search__button input");
    currentButton.onclick = function (ev) {
      if (currentButton.classList.contains("open")) {
        // show mode => remove open class and reset state
        removeOpen(elt, subsearchBloc, inputField, currentButton);
      } else {
        // closed mode => add open class and transform input type in search
        subsearchList.forEach((element) => {
          const subsearchBloc = document.getElementById("sub-search__" + element.name);
          const currentButton = subsearchBloc.querySelector(".sub-search__button");
          const inputField = subsearchBloc.querySelector(".sub-search__button input");
          removeOpen(element, subsearchBloc, inputField, currentButton);
        });
        setOpenAtt(currentButton, inputField, subsearchBloc, elt);
        /**
         * Sub search behavior
         * Check the value of the input and find it in the list of the items
         * Onclick add it to tag container and research array
         */
        inputField.onkeyup = () => {
          if (inputField.value.length >= 2) {
            setSubSearch(inputField);
            buildItemLists();
          } else {
            search();
          }
        };
      }
    };
  });
};

// Remove open when click outside of the button
window.addEventListener("click", function (event) {
  const clickOnBloc = event.target.closest(".sub-search__bloc");
  if (!clickOnBloc) {
    subsearchNames.forEach((element) => {
      const subsearchBloc = document.getElementById("sub-search__" + element.name);
      const currentButton = subsearchBloc.querySelector(".sub-search__button");
      const inputField = subsearchBloc.querySelector(".sub-search__button input");
      removeOpen(element, subsearchBloc, inputField, currentButton);
    });
  }
});

/**
 * ITEM LIST OF EACH SUB SEARCH SECTION
 * Add item list in each sub search (max 30 items)
 */

/**
 * Push items list in their respective array
 * @param {array} displayedRecipes - use only recipes that match any research done before
 * don't forget to reset arrays of each sub search at the beginning
 */
export const pushInArray = (displayedRecipes) => {
  filtersData.ingredientsArr = [];
  filtersData.appliancesArr = [];
  filtersData.ustensilsArr = [];
  displayedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((currentIngredient) => {
      filtersData.ingredientsArr.push(currentIngredient.ingredient);
    });
    filtersData.appliancesArr.push(recipe.appliance);
    recipe.ustensils.forEach((currentUstensil) => {
      filtersData.ustensilsArr.push(currentUstensil);
    });
  });
  // Filter duplicate tags
  filtersData.ingredientsArr = [...new Set(filtersData.ingredientsArr)];
  filtersData.appliancesArr = [...new Set(filtersData.appliancesArr)];
  filtersData.ustensilsArr = [...new Set(filtersData.ustensilsArr)];
};

/**
 * Use each sub search arrays in order to create their respective item list.
 * First reset the section, then you create the element, after that set all attributes, define inner HTML and finally append it in the right section.
 */
export const buildItemLists = () => {
  const ingList = document.getElementById("ingredients__taglist");
  const applList = document.getElementById("appliances__taglist");
  const ustList = document.getElementById("ustensils__taglist");
  filtersData.ingredientsArr = removeDuplicates(filtersData.ingredientsArr);
  filtersData.appliancesArr = removeDuplicates(filtersData.appliancesArr);
  filtersData.ustensilsArr = removeDuplicates(filtersData.ustensilsArr);
  setItemAtt(ingList, filtersData.ingredientsArr, "btn-primary");
  setItemAtt(applList, filtersData.appliancesArr, "btn-success");
  setItemAtt(ustList, filtersData.ustensilsArr, "btn-secondary");
};

/**
 * Function to set the behavior of each search input - simply check if the array include the search and push the result into a new array
 * @param {HTMLElement} inputField
 */
const setSubSearch = (inputField) => {
  const fieldName = inputField.dataset.name;
  let filteredArr = [];
  filtersData[`${fieldName}Arr`].forEach((item) => {
    if (cleanUpString(item).includes(cleanUpString(inputField.value))) {
      filteredArr.push(item);
    }
  });
  filtersData[`${fieldName}Arr`] = filteredArr;
};

/**
 * Check what is in the research tags array and remove the results in the subsearch array
 * @param {array} filteredArr 
 * @returns 
 */
const removeDuplicates = (filteredArr) => {
  researchTags.forEach((tag) => {
    filteredArr.forEach((item) => {
      if (cleanUpString(item).includes(tag)) {
        const indexItem = filteredArr.indexOf(item);
        filteredArr.splice(indexItem, 1);
      }
    });
  });
  return filteredArr;
};
