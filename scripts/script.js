const inputField = document.getElementById("ingredient");
const ingredientsList = document.querySelector(".ingredients-ul");
const generateButton = document.querySelector(".generate-button");
// const mealsList = document.querySelector(".meals-ul");
const mealsGrid = document.querySelector(".recipe-container");
let userIngredients = [];
let mealIdeas = [];

// get ingredient from text field, attributes it to ingredientInput, clear field
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (inputField.value !== "") {
      addIngredient();
      inputField.value = "";
    }
  }
});


// add ingredient to HTML
const addIngredient = () => {
  let newElement = document.createElement("div");
  let newIngredientLine = document.createElement("li");
  let newIngredient = getUserInput();
  let newCross = document.createElement("input");
  if (!userIngredients.includes(newIngredient)) {
    newIngredientLine.innerHTML = `${newIngredient}`;
    newElement.setAttribute("class", "ingredients-li");
    newCross.type = "image";
    newCross.src = "./img/croix.png";
    newCross.id = "reset-icon";
    ingredientsList.appendChild(newElement);
    newElement.appendChild(newCross);
    newElement.appendChild(newIngredientLine);
    userIngredients.push(newIngredient);
  }
};


// return user input from text field
const getUserInput = () => {
  let ingredientInput = inputField.value;
  return ingredientInput;
};


// remove ingredient from list of ingredients depending on which one has been targeted
document.body.addEventListener("click", function (event) {
  if (event.target.id == "reset-icon") {
    const targetedElement = event.target.parentElement
      .getElementsByTagName("li")
      .item(0).innerHTML;
    userIngredients.splice(userIngredients.indexOf(targetedElement), 1);
    event.target.parentElement.remove();
    generateCards(mealIdeas);
  }
});


// format URL with inredients list
function formatIngredientsURL(ingredients) {
  let formattedArray = [];
  for (const ingredient of ingredients) {
    const formattedIngredient = ingredient.replaceAll(" ", "%20")
    formattedArray.push(formattedIngredient)
  }
  let formattedURL = formattedArray.join("%20")
  return formattedURL
}

// add cuisine type to list
// function addToCuisineList() {
//   let cuisineTypeList = [];
//   let checkBoxes = document.querySelectorAll('.cuisine-type:checked');
//   for (let i=0; i<checkBoxes.length; i++) {
//     if (!cuisineTypeList.includes(checkBoxes[i].name)) {
//       cuisineTypeList.push(checkBoxes[i].name)
//     }
//   }
//   return cuisineTypeList
// }


// format URL with cuisine type
function formatCuisineType() {
  const selectedCuisine = document.querySelector(".cuisine-type:checked").id
  const cuisineTypeClean = selectedCuisine.replaceAll(" ", "%20")
  console.log(cuisineTypeClean)
  return cuisineTypeClean
}

const app_id = "42bf6183";
const app_key = "a57dbe2f0ef9f49639879cfafb5b3bbf";
const url = "https://api.edamam.com/api/recipes/v2";
let fullData = {};

// fetch function for API request; might move generateCards func from it
async function fetchAPI() {
  let q = formatIngredientsURL(userIngredients)
  let cuisineOrigin = formatCuisineType()
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${app_id}&app_key=${app_key}&cuisineType=${cuisineOrigin}`
  const response = await fetch(baseURL)
  const data = await response.json();
  fullData = data
  console.log(fullData)
}

// make list of meals with user ingredients, make list of ingredients for the 5 first generated meals
function groupRecipeName(data) {
  const recipeApiList = data.hits
  let recipeNameList = [];
  // let firstRecipeIngredients = []
  // let secondRecipeIngredients = []
  // let thirdRecipeIngredients = []
  // let fourthRecipeIngredients = []
  // let fifthRecipeIngredients = []
  // let sixthRecipeIngredients = []
  // let seventhRecipeIngredients = []
  // let eighthRecipeIngredients = []
  // let ninethRecipeIngredients = []
  // let tenthRecipeIngredients = []

  for (let i = 0; i<recipeApiList.length; i++) {
    recipeNameList.push(recipeApiList[i].recipe.label)
    
////////////////////////// used to display ingredients on cards
    {
    
    // switch (i) {
    //   case 0:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       firstRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 1:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       secondRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 2:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       thirdRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 3:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       fourthRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 4:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       fifthRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 5:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       sixthRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 6:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       seventhRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 7:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       eighthRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 8:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       ninethRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break;
    //   case 9:
    //     for (let j = 0; j<recipeApiList[i].recipe.ingredientLines.length; j++) {
    //       tenthRecipeIngredients.push(recipeApiList[i].recipe.ingredientLines[j])
    //     }
    //     break; 
    }
  }

  return recipeNameList;
    // firstRecipeIngredients, 
    // secondRecipeIngredients,
    // thirdRecipeIngredients,
    // fourthRecipeIngredients,
    // fifthRecipeIngredients,
    // sixthRecipeIngredients,
    // seventhRecipeIngredients,
    // eighthRecipeIngredients,
    // ninethRecipeIngredients,
    // tenthRecipeIngredients
}

async function executionOrder() {
  await fetchAPI()
  generateCards(groupRecipeName(fullData))
  // getRecipeLinks(fullData)
}

/**
 * 
 * @param {array} recipes - list of recipes 
 */
// display meal cards
const generateCards = (recipes) => {
  const recipeContainer = document.querySelector(".recipe-container");
  recipeContainer.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const card = document.createElement("article");
    const recipeName = document.createElement("h2");
    recipeName.innerText = recipe;
    const imgUrl = fullData.hits[i].recipe.images["SMALL"].url
    const recipeImg = document.createElement("img");
    recipeImg.setAttribute("src", imgUrl)

    const recipeLink = document.createElement("a")
    recipeLink.setAttribute("target", "_blank")
    recipeLink.setAttribute("href", getRecipeLinks(fullData)[i])

    const recipeButton = document.createElement("button")
    recipeButton.setAttribute("class", "recipe-button")
    recipeButton.innerText = "yum"

    /////////////////////////////// used to display ingredients on cards
    // const mealIngredientsList = document.createElement("ul")
    // for (let j = 0; j < groupRecipeName(fullData)[i+1].length; j++) {
    //   // console.log(groupRecipeName(fullData)[i+1])
    //   const item = document.createElement("li")
    //   item.innerText = groupRecipeName(fullData)[i+1][j]
    //   mealIngredientsList.appendChild(item)
    // }
    
    recipeContainer.appendChild(card);
    card.appendChild(recipeName);
    card.appendChild(recipeImg)
    recipeLink.appendChild(recipeButton)
    card.appendChild(recipeLink)


    // card.appendChild(mealIngredientsList)
  }
};

// trigger API request on button click
generateButton.addEventListener("click", () => {
  executionOrder()

});

function getRecipeLinks(data){
  let recipeLinksList = []
  for (let i=0; i<data.hits.length; i++) {
    recipeLinksList.push(data.hits[i].recipe.url)
  }
  return recipeLinksList
}


// document.body.addEventListener("click", function () {
//   let cuisineTypeList = [];
//   let checkBoxes = document.querySelectorAll('.cuisine-type:checked');
//   for (let i=0; i<checkBoxes.length; i++) {
//     if (!cuisineTypeList.includes(checkBoxes[i].name)) {
//       cuisineTypeList.push(checkBoxes[i].name)
//     }
//   }
//   console.log(cuisineTypeList)
// })