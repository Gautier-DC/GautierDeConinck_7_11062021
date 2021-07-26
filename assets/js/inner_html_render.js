import { addEventToTag } from "./tags";

/**
 * Set the attributes of sub search bloc and its inner html
 * @param {element} subBloc 
 * @param {string} elt 
 */

export const setSubBloc = (subBloc, elt) => {
    subBloc.setAttribute("id", "sub-search__" + elt);
    subBloc.setAttribute("data-name", elt);
    subBloc.classList.add(
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
    subBloc.innerHTML = `
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
    document.getElementById("sub-searchs").append(subBloc);
};

/**
 * Set the attributes of the search button once it is in open mode (change from a button to a search input field)
 * @param {HTMLElement} btn 
 * @param {HTMLElement} input 
 * @param {HTMLElement} bloc 
 * @param {string} elt 
 */
export const setOpenAtt = (btn, input, bloc, elt) => {
    btn.classList.add("open");
    input.removeAttribute("value");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", `Rechercher un ${elt}`);
    input.setAttribute("data-name", elt);
    input.focus();
    bloc.classList.remove("col-lg-3");
    bloc.classList.add("col-lg-6");
}


/**
 * Define the behavior of sub search buttons - remove open class on sub search button and reset state
 * @param {string} elt - Name of sub search button (define in the array called subsearchNames)
 * @param {element} subsearchBloc - Global div of the sub search
 * @param {element} inputField - Input field element of the sub search
 * @param {element} currentButton - Button element of the sub search
 */
 export const removeOpen = (elt, subsearchBloc, inputField, currentButton) => {
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

  
/**
 * Use each sub search arrays in order to create their respective item list.
 * First reset the section, then you create the element, after that set all attributes, define inner HTML and finally append it in the right section. 
 * @param {HTMLElement} tagList 
 * @param {array} array 
 */

/**
 * Define a maximum of 30 items
 * @param {array}
 */
const ulLength = (array) => {
    return array.length > 30 ? 30 : array.length;
    };
  
export const setItemAtt = (tagList, array) => {
    tagList.innerHTML = "";
    for (let i = 0; i < ulLength(array); i++) {
        let tag = document.createElement("li");
        tag.classList.add("dropdown-item");
        tag.setAttribute("aria-selected", "false");
        tag.setAttribute("role", "option");
        tag.innerHTML = array[i];
        tagList.append(tag);
        addEventToTag(tag);
    }
}