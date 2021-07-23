import { recipes } from "/recipes.js";
import { subsearchNames } from "./variables";
import { cleanUpString } from "./utils";
import { addEventToTag } from "./tags";
import { search } from "./search";

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
    subsearchBloc.setAttribute("id", "sub-search__" + elt);
    subsearchBloc.setAttribute("data-name", elt);
    subsearchBloc.classList.add(
      "sub-search__bloc",
      "col-12",
      "col-lg-3",
      "mb-3",
      "dropdown",
      "d-flex",
      "flex-column",
      "justify-content-between",
      "align-items-center"
    );
    subsearchBloc.innerHTML = `
    <div
    class="sub-search__button d-flex w-100 mw-100 col btn btn-lg justify-content-between align-items-center"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    >
      <input class="col btn btn-lg text-white text-left font-weight-bold border-0" type="button" value="${elt}" />
      <span class="arrow col-1 end-0"></span>
    </div>
    <ul
      id="${elt}__taglist"
      class="sub-search__taglist w-100 mw-100 dropdown-menu btn-success text-white border-0 rounded-bottom"
      role="listbox"
    >
    </ul>`;
    document.getElementById("sub-searchs").append(subsearchBloc);

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
        currentButton.classList.add("open");
        inputField.removeAttribute("value");
        inputField.setAttribute("type", "search");
        inputField.setAttribute("placeholder", `Rechercher un ${elt}`);
        inputField.setAttribute("data-name", elt);
        inputField.focus();
        subsearchBloc.classList.remove("col-lg-3");
        subsearchBloc.classList.add("col-lg-6");
        /**
         * Sub search behavior
         * Check the value of the input and find it in the list of the items
         * Onclick add it to tag container and research array
         */
        inputField.onkeyup = () => {
          console.log("inputfield", inputField);
          if (inputField.value.length >= 1) {
            console.log("sub search input", inputField.value, inputField.dataset.name);
            if (inputField.dataset.name == "Ingrédient") {
              console.log('oui')
              let filteredIngredients = [];
              ingredientsArray.forEach((ing) => {
                if (cleanUpString(ing).includes(inputField.value)) {
                  filteredIngredients.push(ing);
                }
              });
              console.log('milieu', ingredientsArray)
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

/**
 * Define the behavior of sub search buttons - remove open class on sub search button and reset state
 * @param {string} elt - Name of sub search button (define in the array called subsearchNames)
 * @param {element} subsearchBloc - Global div of the sub search
 * @param {element} inputField - Input field element of the sub search
 * @param {element} currentButton - Button element of the sub search
 */
const removeOpen = (elt, subsearchBloc, inputField, currentButton) => {
  if (inputField.value.length >= 3) {
    currentButton.classList.remove("open");
    subsearchBloc.classList.remove("col-lg-6");
    subsearchBloc.classList.add("col-lg-3");
  } else {
    currentButton.classList.remove("open");
    inputField.removeAttribute("type");
    inputField.setAttribute("type", "button");
    inputField.setAttribute("value", elt);
    subsearchBloc.classList.remove("col-lg-6");
    subsearchBloc.classList.add("col-lg-3");
  }
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
 * Define a maximum of 30 items
 * @param {array}
 */
const ulLength = (array) => {
  return array.length > 30 ? 30 : array.length;
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
  console.log("pushinArray", displayedRecipes);
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
  console.log("buildItemlist");
  document.getElementById("Ingrédient__taglist").innerHTML = "";
  for (let i = 0; i < ulLength(ingredientsArray); i++) {
    let ingTag = document.createElement("li");
    ingTag.classList.add("dropdown-item");
    ingTag.setAttribute("aria-selected", "false");
    ingTag.setAttribute("role", "option");
    ingTag.innerHTML = ingredientsArray[i];
    document.getElementById("Ingrédient__taglist").append(ingTag);
    addEventToTag(ingTag);
  }
  document.getElementById("Appareils__taglist").innerHTML = "";
  for (let i = 0; i < ulLength(appliancesArray); i++) {
    let aplTag = document.createElement("li");
    aplTag.classList.add("dropdown-item");
    aplTag.setAttribute("aria-selected", "false");
    aplTag.setAttribute("role", "option");
    aplTag.innerHTML = appliancesArray[i];
    document.getElementById("Appareils__taglist").append(aplTag);
    addEventToTag(aplTag);
  }
  document.getElementById("Ustensiles__taglist").innerHTML = "";
  for (let i = 0; i < ulLength(ustensilsArray); i++) {
    let ustTag = document.createElement("li");
    ustTag.classList.add("dropdown-item");
    ustTag.setAttribute("aria-selected", "false");
    ustTag.setAttribute("role", "option");
    ustTag.innerHTML = ustensilsArray[i];
    document.getElementById("Ustensiles__taglist").append(ustTag);
    addEventToTag(ustTag);
  }
};
