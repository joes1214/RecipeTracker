const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/css/styles.css" />
<link rel="stylesheet" href="/css/reset.css" />

<form id="new-recipe-input" class="card new-recipe-form">
  <div class="form-input">
    <label for='recipe-name-input' class="form-label">Recipe Name:</label>
    <input type='text' name='recipe-name-input' id='recipe-name-input' placeholder="Recipe Name" required/>
  </div>

  <div class="form-input">
    <label for='recipe-description' class="form-label">Recipe Description:</label>
    <textarea id="recipe-description-input" placeholder="Recipe Description..." rows="4"></textarea>
  </div>

  <div id="ingredient-list-container" class="ingredient-input-list">
    <div class="form-input">
      <label for='recipe-ingredient-1' class="form-label">Ingredient 1:</label>
      <input type='text' name='recipe-ingredient-1' id='recipe-ingredient-1' placeholder="Ingredient X" />
    </div>

  </div>

  <button id="add-ingredient" type="button" class="btn">+ Add Ingredient</button>

  <div>
    <div class="form-input">
      <label for='recipe-tags-input' class="form-label">Tags (Seperated by comma):</label>
      <input type='text' name='recipe-tags-input' id='recipe-tags-input' placeholder="Tag1, Tag2, Tag3" />
    </div>
  </div>
  
  <button type="submit" class="btn" onsubmit="onSubmit(event)">Submit</button>
</form>
`;

class NewRecipeForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.recipeData = {
      recipeName: "",
      recipeDescription: "",
      recipeIngredients: [],
      recipeTags: [],
    };
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadow.append(template.content.cloneNode(true));
    const test = document.createElement("h2");
    test.innerText = this.ingredients;

    // this.shadow.appendChild(test.content)
  }

  addEventListeners() {
    const form = this.shadow.querySelector("#new-recipe-input");
    const ingredientListContainer = this.shadow.querySelector(
      "#ingredient-list-container"
    );
    const addIngredientButton = this.shadow.querySelector("#add-ingredient");

    addIngredientButton.addEventListener("click", () => {
      const ingredientCount = ingredientListContainer.childElementCount + 1;
      const newIngredientInput = document.createElement("div");
      newIngredientInput.classList.add("form-input");
      newIngredientInput.innerHTML = `
      <label for="recipe-ingredient-${ingredientCount}" class="form-label">Ingredient ${ingredientCount}:</label>
      <input type="text" name="recipe-ingredient-${ingredientCount}" id="recipe-ingredient-${ingredientCount}" placeholder="Ingredient ${ingredientCount}" />
      `;
      ingredientListContainer.appendChild(newIngredientInput);
    });
    form.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });

    const recipeNameInput = this.shadow.querySelector("#recipe-name-input");
    const recipeDescriptionInput = this.shadow.querySelector(
      "#recipe-description-input"
    );
    // const recipeIngredients = this.shadow.querySelector('#recipe-name-input');
    const recipeTagsInput = this.shadow.querySelector("#recipe-tags-input");

    recipeNameInput.addEventListener("input", (e) => {
      this.recipeData.recipeName = e.target.value;
    });

    recipeDescriptionInput.addEventListener("input", (e) => {
      this.recipeData.recipeDescription = e.target.value;
    });

    recipeTagsInput.addEventListener("input", (e) => {
      this.recipeData.recipeTags = [
        ...e.target.value
          .split(",")
          .map((str) => str.trim())
          .filter((str) => str !== ""),
      ];
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const ingredientInputs = Array.from(
      this.shadow.querySelectorAll(`input[id^="recipe-ingredient-"]`)
    );
    this.recipeData.recipeId = this.uuidv4();
    const ingredients = ingredientInputs
      .map((input) => input.value.trim())
      .filter((val) => val !== "");
    this.recipeData.recipeIngredients = [...ingredients];
    const recipeData = this.recipeData;

    // console.log(recipeData);

    const ingredientListContainer = this.shadow.querySelector(
      "#ingredient-list-container"
    );
    ingredientListContainer.innerHTML = `
      <div class="form-input">
        <label for="recipe-ingredient-1" class="form-label">Ingredient 1:</label>
        <input type="text" name="recipe-ingredient-1" id="recipe-ingredient-1" placeholder="Ingredient 1" />
      </div>
    `;

    // Reset other form fields
    const recipeNameInput = this.shadow.querySelector("#recipe-name-input");
    const recipeDescriptionInput = this.shadow.querySelector(
      "#recipe-description-input"
    );
    const recipeTagsInput = this.shadow.querySelector("#recipe-tags-input");
    recipeNameInput.value = "";
    recipeDescriptionInput.value = "";
    recipeTagsInput.value = "";

    //Append to current list, then save
    recipes.push(recipeData);
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }

  //Simple GUID generator from https://www.geeksforgeeks.org/how-to-create-a-guid-uuid-in-javascript/
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

customElements.define("new-recipe-form", NewRecipeForm);
