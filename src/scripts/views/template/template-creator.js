import CONFIG from '../../globals/config';

// Function to calculate star ratings
export function fillingStar(index, rating) {
  const starTotal = 5;
  const starPercentage = (rating / starTotal) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  document.querySelectorAll('.stars-inner')[index].style.width =
    starPercentageRounded;
}

// Function to display stars based on rating
export function displayRating(rating) {
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('stars'); // Add class for styling

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');

    // Full star logic
    if (i <= Math.floor(rating)) {
      star.classList.add('filled'); // Full star
      star.innerHTML = '★'; // Full star
    } else if (
      i === Math.floor(rating) + 1 &&
      rating % 1 > 0 &&
      rating % 1 < 1
    ) {
      star.classList.add('half'); // Half star
      star.innerHTML = '★'; // Half star
      console.log(`Half Star: ${i}`); // Debugging statement to check half star logic
    } else {
      star.innerHTML = '☆'; // Empty star
    }

    starsContainer.appendChild(star);
  }

  return starsContainer;
}

// Template for rendering restaurant details inside a card
export const restaurantDetail = (restaurant) => `
  <div class="restaurant-detail__card">
    <div class="restaurant-detail__header">
      <img class="restaurant-detail__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
      <div class="restaurant-detail__info">
        <h2 class="restaurant-detail__title">${restaurant.name}</h2>
        <p class="restaurant-detail__rating">⭐ ${restaurant.rating}</p>
      </div>
    </div>

    <div class="restaurant-detail__content">
      <div class="restaurant-detail__section">
        <h3>Address</h3>
        <p>${restaurant.address}, ${restaurant.city}</p>
      </div>

      <div class="restaurant-detail__section">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
      </div>

      <div class="restaurant-detail__section">
        <h3>Menus</h3>
        <div class="restaurant-detail__menus">
          <h4>Foods</h4>
          <ul id="foods" class="items"></ul>

          <h4>Drinks</h4>
          <ul id="drinks" class="items"></ul>
        </div>
      </div>

      <div class="restaurant-detail__section">
        <h3>Customer Reviews</h3>
        <ul id="customerReviews" class="items"></ul>
      </div>
    </div>
  </div>
`;

// Templates for restaurant items, food, drink, and reviews
export const restaurantFoodDetail = (food) => `
  <p class="item">${food.name}</p>
`;

export const restaurantDrinkDetail = (drink) => `
  <p class="item">${drink.name}</p>
`;

export const restaurantCustomerReviewsDetail = (review) => `
  <div class="item">
    <p class="name">${review.name}</p>
    <p class="date">${review.date}</p>
    <p class="review">${review.review}</p>
  </div>
`;

// Template for the like button
export const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

// Template for the liked button
export const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

// Function to render restaurant data in the DOM
export const renderRestaurants = (restaurants) => {
  const restaurantList = document.getElementById('restaurant-list');
  restaurantList.innerHTML = ''; // Clear the list

  if (restaurants && restaurants.length > 0) {
    restaurants.forEach((restaurant) => {
      const listItem = document.createElement('li');
      listItem.classList.add('restaurant-card');
      listItem.setAttribute('tabindex', '0'); // Add tabindex

      // Create the star rating using the displayRating function
      const starsContainer = displayRating(restaurant.rating);

      listItem.innerHTML = `
              <figure class="headline__figure">
                   <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image">
                  <figcaption class="location">${restaurant.city}</figcaption>
              </figure>
              <div class="headline__content">
                  <h1 class="headline__title">
  <a href="/#/detail/${restaurant.id}" class="restaurant-name">${restaurant.name}</a>
</h1>
                  <div class="rating">
                      <p class="rating-text">Rating:  ${restaurant.rating} ${starsContainer.outerHTML}</p>
                  </div>
                  <p class="description">${restaurant.description}</p>
              </div>
          `;
      restaurantList.appendChild(listItem);
    });
  } else {
    restaurantList.innerHTML = '<li class="no-data">No restaurants found.</li>';
  }
};
