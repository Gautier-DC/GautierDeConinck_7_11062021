import 'bootstrap';
import { Dropdown } from 'bootstrap';

// Import
import { recipes } from '/recipes.js'
import { search } from './search';
import { setRecipes } from './set_recipes';
import { subsearchNames, mainsearchInput, currentSearch } from './variables';
import { buildSubsearchBtn,  pushInArray, buildItemLists } from './sub_searchs';

setRecipes(recipes);
pushInArray(recipes);
buildSubsearchBtn(subsearchNames);
buildItemLists();
mainsearchInput.addEventListener("keyup", e => { search()});
console.log(mainsearchInput)
