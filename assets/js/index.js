import 'bootstrap';
import { Dropdown } from 'bootstrap';

// Import data
import { recipes } from '/recipes.js'

//DOM Selector
const tagContainer = document.querySelector('.tag-container');
const mainsearchInput = document.querySelector('#main-search');
const recipesSection = document.querySelector('#recipes');
let filteredRecipes = recipes;
let dropdownItems = document.getElementsByClassName('dropdown-item');

//ARRAYS
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

// Appliances Array

//Create sub search button & list
let subsearchNames = ['Ingrédient', 'Appareils', 'Ustensiles'];

// Remove open class and reset state
const removeOpen = (elt, subsearchBloc, inputField, currentButton) => {
  if (inputField.value.length >= 3) {
  currentButton.classList.remove('open');
  subsearchBloc.classList.remove('col-lg-6');
  subsearchBloc.classList.add('col-lg-3');
  } else {
  currentButton.classList.remove('open');
  inputField.removeAttribute('type');
  inputField.setAttribute('type','button');
  inputField.setAttribute('value',elt);
  subsearchBloc.classList.remove('col-lg-6');
  subsearchBloc.classList.add('col-lg-3');
  }
}

// Build all sub searchs parts
const buildSubsearchBtn = (subsearchList) => {
  subsearchList.forEach(elt => {
    let subsearchBloc = document.createElement('div');
    subsearchBloc.setAttribute('id', 'sub-search__' + elt);
    subsearchBloc.setAttribute('data-name', elt);
    subsearchBloc.classList.add('sub-search__bloc', 'col-12', 'col-lg-3', 'mb-3', 'dropdown', 'd-flex', 'flex-column', 'justify-content-between', 'align-items-center');
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
    document.getElementById('sub-searchs').append(subsearchBloc)
    // Show tag list in sub searchs and transform the button into search input field
    const currentButton = subsearchBloc.querySelector('.sub-search__button');
    let inputField = subsearchBloc.querySelector('.sub-search__button input');
    currentButton.onclick = function(ev){
      if(currentButton.classList.contains('open')){
        // show mode => remove open class and reset state
        removeOpen(elt, subsearchBloc, inputField, currentButton);
      } else{
        // closed mode => add open class and transform input type in search
        subsearchList.forEach(element => {
          const subsearchBloc = document.getElementById('sub-search__' + element);
          const currentButton = subsearchBloc.querySelector('.sub-search__button');
          const inputField = subsearchBloc.querySelector('.sub-search__button input');
          removeOpen(element, subsearchBloc, inputField, currentButton);
        });
        currentButton.classList.add('open');
        inputField.removeAttribute('value');
        inputField.setAttribute('type','search');
        inputField.setAttribute('placeholder',`Rechercher un ${elt}`);
        inputField.focus();
        subsearchBloc.classList.remove('col-lg-3');
        subsearchBloc.classList.add('col-lg-6');
      };
    };
  });
};
buildSubsearchBtn(subsearchNames);

// Remove open when click outside of the button 
window.addEventListener( 'click', function(event) {
  const clickOnBloc = event.target.closest('.sub-search__bloc');
  if (!clickOnBloc) {
    subsearchNames.forEach(element => {
      const subsearchBloc = document.getElementById('sub-search__' + element);
      const currentButton = subsearchBloc.querySelector('.sub-search__button');
      const inputField = subsearchBloc.querySelector('.sub-search__button input');
      removeOpen(element, subsearchBloc, inputField, currentButton);
    });
  };
});

// Add tags in susbsearch (max 30 items)

// Define a maximum of 30 items
const ulLength = (array) =>{
  return(array.length > 30 ? 30 : array.length);
}

// Push tags in their respective array
const pushInArray = (displayedRecipes) => {
  ingredientsArray = [];
  appliancesArray = [];
  ustensilsArray = [];
  displayedRecipes.forEach(recipe => {
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
} 
pushInArray(filteredRecipes);
// Create li for each tag and add it in there respective ul

// Add tags in array
const addEventToTag = (tag) => {
  tag.addEventListener('click', function(e){
    researchTags.push(tag.innerText);
    addTags();
  });
}

const buildTagLists = () => {
  document.getElementById('Ingrédient__taglist').innerHTML = '';
  for (let i = 0; i < ulLength(ingredientsArray); i++){
    let ingTag = document.createElement('li');
    ingTag.classList.add('dropdown-item');
    ingTag.setAttribute('aria-selected', 'false');
    ingTag.setAttribute('role', 'option');
    ingTag.innerHTML = ingredientsArray[i];
    document.getElementById('Ingrédient__taglist').append(ingTag);
    addEventToTag(ingTag);
  };
  document.getElementById('Appareils__taglist').innerHTML = '';
  for (let i = 0; i < ulLength(appliancesArray); i++){
    let aplTag = document.createElement('li');
    aplTag.classList.add('dropdown-item');
    aplTag.setAttribute('aria-selected', 'false');
    aplTag.setAttribute('role', 'option');
    aplTag.innerHTML = appliancesArray[i];
    document.getElementById('Appareils__taglist').append(aplTag);
    addEventToTag(aplTag);
  };
  document.getElementById('Ustensiles__taglist').innerHTML = '';
  for (let i = 0; i < ulLength(ustensilsArray); i++){
    let ustTag = document.createElement('li');
    ustTag.classList.add('dropdown-item');
    ustTag.setAttribute('aria-selected', 'false');
    ustTag.setAttribute('role', 'option');
    ustTag.innerHTML = ustensilsArray[i];
    document.getElementById('Ustensiles__taglist').append(ustTag);
    addEventToTag(ustTag);
  };
};
buildTagLists();

// create recipes
const setRecipes = (recipes) => {
  document.querySelector('#recipes').innerHTML = '';
  console.log('créer les recettes', recipes)
  recipes.forEach(recipe => {
    let recipeHTML = `
    <article class="card col-12 col-md-6 col-lg-4 border-0">
          <figure class="card-img-top px-0 mb-0"></figure>
          <div class="card-body d-flex flex-column justify-content-start rounded-bottom">
            <div class="row d-flex justify-content-between">
              <h2 class="card-title col-8 col-sm-9 col-md-7 col-xl-8 text-truncate">${recipe.name}</h2>
              <h2 class="col"><i class="far fa-clock"></i> ${recipe.time} min</h2>
            </div>
            <div class="row justify-content-between align-items-start">
              <ul class="card-text col-6 list-unstyled line-clamp">`;
    recipe.ingredients.forEach(ing => {
      recipeHTML += `<li><strong>${ing.ingredient} :</strong> ${ing.quantity ? ing.quantity : ''} ${ing.unit ? ing.unit : ''} </li>`
    });
    recipeHTML += `
          </ul>
          <p class="card-text col-6 line-clamp">
            ${recipe.description}
          </p>
        </div>
      </div>
    </article>
    `;
    recipesSection.insertAdjacentHTML('beforeend', recipeHTML);
  });
};
setRecipes(filteredRecipes);

// Create tags
let researchTags = [];

// Elements and style for tags
const createTag = (label) => {
  const span = document.createElement('span');
  span.classList.add('tag', 'btn', 'btn-primary', 'btn-sm', 'mb-1', 'mr-3');
  span.innerHTML = label;
  const closeBtn = document.createElement('i');
  closeBtn.classList.add('far', 'fa-times-circle');
  closeBtn.setAttribute('data-item', label);
  span.appendChild(closeBtn);
  return span;
};

// Reset to avoid cumulated tags
const reset = () => {
  document.querySelectorAll('.tag').forEach( tag =>{
    tag.parentElement.removeChild(tag);
  });
};

// Add tags in tag container
const addTags = () => {
  reset();
  researchTags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
};


// Remove tags of the array
document.addEventListener('click', (e) => {
  if(e.target.tagName == 'I') {
    const value = e.target.getAttribute('data-item');
    const index = researchTags.indexOf(value);
    researchTags = [...researchTags.slice(0, index), ...researchTags.slice(index + 1)];
    addTags();
  };
});


// FIRST ALGORYTHME SEARCH

// Clean up string function
const cleanUpString = (str) => {
  let handledStr = str.toLowerCase();
  handledStr = handledStr.normalize('NFD').replace(/\p{Diacritic}/gu, "");
  return handledStr;
}


// Main search
mainsearchInput.onchange = () => {
  if(mainsearchInput.value.length >= 3){
    let mainSearch = cleanUpString(mainsearchInput.value);
    filteredRecipes = recipes.filter( recipe => {
      for (let i = 0; i < recipe.ingredients.length; i++){
        for (let j = 0; j < recipe.ustensils.length; j++){
          if (
            cleanUpString(recipe.name).includes(mainSearch) ||
            cleanUpString(recipe.appliance).includes(mainSearch) ||
            cleanUpString(recipe.ingredients[i].ingredient).includes(mainSearch) ||
            cleanUpString(recipe.ustensils[j]).includes(mainSearch) ||
            cleanUpString(recipe.description).includes(mainSearch)
          ) {
            return true;
          } else {            
            return false;
          }
        };
      };
    });
    setRecipes(filteredRecipes);
    if (recipesSection.childNodes.length == 0){
      let errorMsg = document.createElement('p');
      errorMsg.classList.add('recipes__errormsg', 'col','font-weight-bold', 'text-center');
      errorMsg.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
      recipesSection.appendChild(errorMsg);
    }
    pushInArray(filteredRecipes);
    buildTagLists();
  };
};
