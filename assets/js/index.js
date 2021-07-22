import 'bootstrap';
import { Dropdown } from 'bootstrap';

// Import
import { recipes } from '/recipes.js'
import { buildItemLists, pushInArray } from './tags';
import { search } from './search';
import { setRecipes } from './set_recipes';
import { subsearchNames, mainsearchInput, currentSearch } from './variables';
import { buildSubsearchBtn } from './sub_searchs';

setRecipes(recipes);
pushInArray(recipes);
buildSubsearchBtn(subsearchNames);
buildItemLists();
mainsearchInput.addEventListener("keyup", e => { search(mainsearchInput)});
console.log(mainsearchInput)
