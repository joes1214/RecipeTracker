const recipeCardContainer = document.getElementById('recipe-card-container');
const recipeCardTemplate = document.getElementById('recipe-card');
const recipeArray = JSON.parse(localStorage.getItem('recipes') || []);

function insertToElement(template, selector, data){
  //Selects a specific element by selector from template, includes data
  const element = template.querySelector(selector);
  element.textContent = data;
}

function insertListToElement(template, selector, array, className = "") {
  //Select an element matching selector from template, goes through array
  //and includes the data in a new <li> element with an optional class
  if(!array || array.length < 0) {
    return;
  }

  const container = template.querySelector(selector);
  array.map((item, index) => {
    const listItem = document.createElement("li");

    if(className !== "") {
      listItem.classList.add(className);
    }

    listItem.textContent = item;
    container.appendChild(listItem);
  })
}

function changeOnClick(template, id) {
  const deleteBtn = template.querySelector("#delete-btn");
  const editBtn = template.querySelector("#edit-btn");

  deleteBtn.onclick = () => deleteRecipeOnClick(id);
  editBtn.onclick = () => editRecipeOnClick(id);
}

function deleteRecipeOnClick(id) {
  console.log("id of recipe: " + id);
}

function editRecipeOnClick(id) {
  console.log("id of recipe: " + id);
}

function renderElements(recipes) {
  recipes.forEach((recipe, key) => {
    //Create a copy of the template element
    const recipeClone = recipeCardTemplate.content.cloneNode(true);

    recipeClone.id = 'recipe.recipeId';
  
    insertToElement(recipeClone, '#recipe-card-name', recipe.recipeName);
    insertToElement(recipeClone, '#recipe-card-description', recipe.recipeDescription);
  
    insertListToElement(recipeClone, '#recipe-card-ingredient-list', 
      recipe.recipeIngredients)
  
    insertListToElement(recipeClone, '#recipe-card-tag-list', 
    recipe.recipeTags, "tag")

    changeOnClick(recipeClone, recipe.recipeId);
  
    recipeCardContainer.appendChild(recipeClone)
    // console.log("generate recipe card "+ key)
  });
}

// Listen for changes in the localStorage
window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    const updatedRecipes = JSON.parse(e.newValue) || [];
    renderElements(updatedRecipes);
  }
});

renderElements(recipeArray);