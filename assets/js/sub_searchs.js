import { subsearchNames } from './variables'
/**
 * CREATE SUB SEARCH BUTTON and define his behavior.
 * Use a factory method in order to create possible new sub search easily
 */

/**
 * Build all sub searchs parts
 * @param {string} subsearchList 
 */
export const buildSubsearchBtn = (subsearchList) => {
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
    document.getElementById('sub-searchs').append(subsearchBloc);
    
    /**
     * Show tag list in sub searchs and transform the button into search input field
     */
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
        /**
         * Sub search behavior
         * Check the value of the input and find it in the list of the items
         * Onclick add it to tag container and to the research array
        */
        const ingredientSearchInput = document.querySelector("#sub-search__Ingrédient input[type='search']");
        ingredientSearchInput.onkeyup = () => {
          if(ingredientSearchInput.value.length >= 1){
            console.log('sub search input')
          }
        };
      };
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
  };
};

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