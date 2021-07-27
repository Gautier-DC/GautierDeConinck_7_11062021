import { subsearchNames } from "./variables";
import { cleanUpString } from "./utils";
import { search } from "./search";
import { setOpenAtt, setSubBloc, removeOpen, setItemAtt } from "./inner_html_render";

//Arrays for items lists
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

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
          const subsearchBloc = document.getElementById("sub-search__" + element);
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
          if (inputField.value.length >= 1) {
            console.log("sub search input", inputField.value, inputField.dataset.name);
            if (inputField.dataset.name == "Ingrédient") {
              let filteredIngredients = [];
              ingredientsArray.forEach((ing) => {
                if (cleanUpString(ing).includes(inputField.value)) {
                  filteredIngredients.push(ing);
                }
              });
              ingredientsArray = filteredIngredients;
            } else if (inputField.dataset.name == "Ustensiles") {
              let filteredUstensils = [];
              ustensilsArray.forEach((ust) => {
                if (cleanUpString(ust).includes(inputField.value)) {
                  filteredUstensils.push(ust);
                };
              });
              ustensilsArray = filteredUstensils;
            } else {
              let filteredAppliances = [];
              appliancesArray.forEach((app) => {
                if (cleanUpString(app).includes(inputField.value)) {
                  filteredAppliances.push(app);
                };
              });
              appliancesArray = filteredAppliances;
            }
            buildItemLists();
          } else {
            search();
          }
          console.log('fin', ingredientsArray)
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
      const subsearchBloc = document.getElementById("sub-search__" + element);
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
  ingredientsArray = [];
  appliancesArray = [];
  ustensilsArray = [];
  displayedRecipes.forEach((recipe) => {
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
  console.log("endpushin", ingredientsArray);
};

/**
 * Use each sub search arrays in order to create their respective item list.
 * First reset the section, then you create the element, after that set all attributes, define inner HTML and finally append it in the right section.
 */
export const buildItemLists = () => {
  const ingList = document.getElementById("Ingrédient__taglist");
  const applList = document.getElementById("Appareils__taglist");
  const ustList = document.getElementById("Ustensiles__taglist");
  setItemAtt(ingList, ingredientsArray);
  setItemAtt(applList, appliancesArray);
  setItemAtt(ustList, ustensilsArray);
};
