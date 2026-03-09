const API_KEY = import.meta.env.VITE_SPOONFUL_API_KEY;
const baseUrl = "https://api.spoonacular.com/";

const getRandomRecipe = () => {
  fetch(`${baseUrl}recipes/random`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      populateRecipe(data);
    })
    .catch((error) => console.error(error));
};

document.getElementById("get_recipe").addEventListener("click", (e) => {
  e.preventDefault();
  getRandomRecipe();
});

const populateRecipe = (data) => {
  const recipe = data.recipes[0];
  document.getElementById("recipe_title").textContent = recipe.title;
  document.getElementById("recipe_image").src = recipe.image;
  document.getElementById("time").textContent =
    `Prep time: ${recipe.readyInMinutes} min`;
  //Ingredients
  const ul = document.getElementById("ingredient_list");
  ul.innerHTML = "";
  for (let i = 0; i < recipe.extendedIngredients.length; i++) {
    let li = document.createElement("li");
    li.textContent = recipe.extendedIngredients[i].name;
    ul.appendChild(li);
  }

  document.getElementById("instructions").innerHTML = recipe.instructions;
};
