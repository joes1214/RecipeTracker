class NewRecipeForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.recipeData = {
      recipeName: '',
      recipeDescription: '',
      recipeIngredients: [],
      recipeTags: [],
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadow.innerHTML = `
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/reset.css" />

    <form id="new-recipe-input" class="card new-recipe-form">
      <div class="form-input">
        <label for='recipe-name-input' class="form-label">Recipe Name:</label>
        <input type='text' name='recipe-name-input' id='recipe-name-input' placeholder="Recipe Name" />
      </div>

      <div class="form-input">
        <label for='recipe-description' class="form-label">Recipe Description:</label>
        <textarea id="recipe-description-input" placeholder="Recipe Description..." rows="4"></textarea>
      </div>

      <div class="ingredient-input-list">
        <div class="form-input">
          <label for='recipe-name-input' class="form-label">Ingredient X:</label>
          <input type='text' name='recipe-name-input' id='recipe-name-input' placeholder="Ingredient X" />
        </div>

        <button type="button" class="btn">+ Add Ingredient</button>
      </div>

      <div>
      <div class="form-input">
      <label for='recipe-tags-input' class="form-label">Tags (Seperated by comma):</label>
      <input type='text' name='recipe-tags-input' id='recipe-tags-input' placeholder="Tag1, Tag2, Tag3" />
    </div>

    <button type="submit" class="btn" onsubmit="onSubmit(event)">Submit</button>
      </div>
    </form>
    `;
  }

  addEventListeners() {
    const form = this.shadow.querySelector('#new-recipe-input');

    form.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

    const recipeNameInput = this.shadow.querySelector('#recipe-name-input');
    const recipeDescriptionInput = this.shadow.querySelector('#recipe-description-input');
    // const recipeIngredients = this.shadow.querySelector('#recipe-name-input');
    const recipeTagsInput = this.shadow.querySelector('#recipe-tags-input');

    recipeNameInput.addEventListener('input', (e) => {
      this.recipeData.recipeName = e.target.value;
    });

    recipeDescriptionInput.addEventListener('input', (e) => {
      this.recipeData.recipeDescription = e.target.value;
    });

    recipeTagsInput.addEventListener('input', (e) => {
      this.recipeData.recipeTags = [...e.target.value.split(',').map((str) => str.trim()).filter((str) => str !== "")];
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const recipeData = this.recipeData;
    console.log(recipeData);
  }
}

customElements.define('new-recipe-form', NewRecipeForm);