import 'bootstrap';

// Import data
import { recipes } from '/recipes.js'
console.log(recipes)

//Arrays
let ingredientsArray = recipes[ingredients].map(a => a.ingredient);
console.log(ingredientsArray);

//Create sub search button & list
let subsearchNames = ['Ingrédient', 'Appareils', 'Ustensiles'];

// Remove open class and reset state
const removeOpen = (elt, subsearchBloc, inputField, currentButton) => {
  currentButton.classList.remove('open');
  inputField.removeAttribute('type');
  inputField.setAttribute('type','button');
  inputField.setAttribute('value',elt);
  subsearchBloc.classList.remove('col-lg-6');
  subsearchBloc.classList.add('col-lg-3');
}

const buildSubsearchBtn = (subsearchList) => {
  subsearchList.forEach(elt => {
    let subsearchBloc = document.createElement('div');
    subsearchBloc.setAttribute('id', 'sub-search__' + elt);
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
    // Show tag list in sub searchs and transform into search input field
    const currentButton = subsearchBloc.querySelector('.sub-search__button')
    let inputField = subsearchBloc.querySelector('.sub-search__button input')
   
    currentButton.onclick = function(ev){
      ev.stopPropagation();
      if(currentButton.classList.contains('open')){
        // show mode => remove open class and reset state
        removeOpen(elt, subsearchBloc, inputField, currentButton);
      } else{
        // closed mode => add open class and transform input type in search
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

window.addEventListener( 'click', function(event) {
  if (event.target.className !== 'sub-search__button') {
    console.log(event.target)
    console.log('hey');
    subsearchNames.forEach(element => {
      const subsearchBloc = document.getElementById('sub-search__' + element);
      const currentButton = subsearchBloc.querySelector('.sub-search__button')
      const inputField = subsearchBloc.querySelector('.sub-search__button input')
      removeOpen(element, subsearchBloc, inputField, currentButton);
    });
  }
}) 



