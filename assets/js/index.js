import 'bootstrap';
import { Dropdown } from 'bootstrap';

// Import
import { recipes } from '/recipes.js'
import { buildItemLists } from './tags';
import { search } from './search';
import { setRecipes } from './set_recipes';
import { subsearchNames } from './variables';
import { buildSubsearchBtn } from './sub_searchs';
import { pushInArray } from './tags';

search();
setRecipes(recipes);
pushInArray(recipes);
buildSubsearchBtn(subsearchNames);
buildItemLists();

