import "bootstrap";

// Import
import { recipes } from "/recipes.js";
import { search } from "./algo";
import { setRecipes } from "./set_recipes";
import { subsearchNames, mainsearchInput } from "./variables";
import { buildSubsearchBtn, pushInArray, buildItemLists } from "./sub_searchs";

setRecipes(recipes);
pushInArray(recipes);
buildSubsearchBtn(subsearchNames);
buildItemLists();
mainsearchInput.addEventListener("keyup", (e) => {
  search();
});
