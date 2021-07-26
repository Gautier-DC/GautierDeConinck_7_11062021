import { recipesSection } from "./variables";
import { recipes } from '/recipes.js'
/**
 * Create HTML recipes cards - Use ternary to avoid missing element in ingredients part
 * @param {array} 
 */
 export const setRecipes = (matchedRecipes) => {
    recipesSection.innerHTML = '';
    matchedRecipes.forEach(recipe => {
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