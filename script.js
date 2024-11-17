const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const RecipeContainer = document.querySelector('.Recipe-Container');
const RrecipedetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

//function to get Recipes
const fetchRecipes = async (query) => {
    RecipeContainer.innerHTML = "<h2>fetching recipes...</h2>";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); 
    const response = await data.json();

    RecipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add("recipe");
          recipeDiv.innerHTML = `
          <image src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>Belongs to <span>${meal.strCategory}</span> Category</p>
          
          `
          const button = document.createElement('button');
          button.textContent ="view Recipe"
          recipeDiv.appendChild(button);

        //   Adding EventListener to recipe button 
        button.addEventListener('click' , ()=>{
            openRecipepopup(meal);
        });
         RecipeContainer.appendChild(recipeDiv);
    });
}
 catch (error) {
    RecipeContainer.innerHTML = "<h2>Error in fetching...</h2>";   
}

}
//funtion to fetchingredients and measurment
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1;i<20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
     return ingredientsList;
}
const openRecipepopup = (meal) => {
    RrecipedetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="ingredientList">${fetchIngredients(meal)}</ul>
      <div class="recipeInstructions">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
    </div>
    `
    
    RrecipedetailsContent.parentElement.style.display = "block";
}
recipeCloseBtn.addEventListener('click', ()=>{
    RrecipedetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        RecipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    
});