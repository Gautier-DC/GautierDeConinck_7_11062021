import 'bootstrap';

// DOM Selector
let subsearchButton = document.getElementsByClassName('sub-search__button');


// Import data
import { recipes } from '/recipes.js'
console.log(recipes)

//Create sub search button & list
let subsearchNames = ['Ingrédient', 'Appareils', 'Ustensiles'];

const buildSubsearchBtn = (subsearchList) => {
  subsearchList.forEach(elt => {
    let subsearchBloc = document.createElement('div');
    subsearchBloc.setAttribute('id', 'sub-search__' + elt);
    subsearchBloc.classList.add('sub-search__bloc', 'col-12', 'col-lg-3', 'mb-3', 'dropdown', 'd-flex', 'flex-column', 'justify-content-between', 'align-items-center');
    subsearchBloc.innerHTML = `<div
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
  })
}
buildSubsearchBtn(subsearchNames);

// Show tag list in sub searchs and transform into search input field
document.querySelectorAll('.sub-search__bloc').forEach(subsearch => {
  const currentButton = subsearch.querySelector('.sub-search__button')
  let inputField = subsearch.querySelector('.sub-search__button input')
  currentButton.onclick = function(){
    if(currentButton.classList.contains('open')){
      // show mode => remove open class and reset state
      currentButton.classList.remove('open');
      inputField.removeAttribute('type');
      inputField.setAttribute('type','button');
      inputField.setAttribute('value','Appareils');
      subsearch.classList.remove('col-lg-6');
      subsearch.classList.add('col-lg-3');
    } else{
      // closed mode => add open class and transform input type in search
      currentButton.classList.add('open');
      inputField.removeAttribute('value');
      inputField.setAttribute('type','search');
      inputField.setAttribute('placeholder','Recherche ton ingédient');
      inputField.focus();
      subsearch.classList.remove('col-lg-3');
      subsearch.classList.add('col-lg-6');
    };
  }
});
/*class searchFilters{
  constructor (optionWrapper, dropdownContent){
    this.optionWrapper = optionWrapper;
    this.dropdownContent = dropdownContent;
  }
}

document.querySelector('#filters').forEach(elt => {
  
});
// Deploy filters menu
let ingredients = document.querySelector('#ingredients');
ingredients.addEventListener('click', function () {
  optionWrapper[0].classList.toggle('open');
  dropdownContent[0].classList.toggle('open');
  filterName[0].remove();
  document.getElementById('ingredients-filter-button').insertAdjacentHTML('afterbegin', '<input type="text" placeholder="Recherche un ingrédient" id="ingredient-search" />');
  document.getElementById('ingredient-search').focus();
});

document.querySelector('#appliances').addEventListener('click', function () {
  optionWrapper[1].classList.toggle('open');
  dropdownContent[1].classList.toggle('open');
});
document.querySelector('#ustensils').addEventListener('click', function () {
  console.log(optionWrapper);
  console.log(dropdownContent);
  optionWrapper[2].classList.toggle('open');
  dropdownContent[2].classList.toggle('open');
});
*/

