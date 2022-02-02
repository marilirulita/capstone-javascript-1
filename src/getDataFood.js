import getItemData from './createPopup.js';
import hidenItems from './hidenItems.js';

// function display an array of objects
const displayData = (arr) => {
  const board = document.querySelector('.container-food-cards');
  board.innerHTML = '';

  arr.forEach((food) => {
    const item = document.createElement('article');
    item.classList.add('card-food');
    item.innerHTML = `
        <div class="card-title">
          <h5>${food.strMeal}</h5>
        </div>
        <div class="btn-recipe">
          <button type="button">Recipe</button>
        </div>
        <div class="btn-liked">
          <button type="button">Like</button>
        </div>
        <div class="card-img">
         <img src="${food.strMealThumb}" class="img-food">        
        </div>     
    `;
    item.id = food.idMeal;
    // event listener just for test
    item.addEventListener('click', () => {
      getItemData(food);
      hidenItems();
    });
    board.appendChild(item);
  });
};

const displayCounter = (typeFoodSelected, count) => {
  typeFoodSelected.innerHTML = `${typeFoodSelected.textContent} (${count})`;
};

// function to get images and title
const getAllData = async (url, typeFoodSelected) => {
  const request = new Request(url);
  const response = await fetch(request);
  const responseJson = await response.json();
  const responseInfo = responseJson.meals;
  displayCounter(typeFoodSelected, responseInfo.length);
  displayData(responseInfo);
};

export { getAllData as default };
