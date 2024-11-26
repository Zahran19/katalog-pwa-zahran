import FavoriteRestaurantdb from '../../data/favorite-restaurant-idb';
import { renderRestaurants } from '../template/template-creator';

const Like = {
  async render() {
    return `
      <h1 class="main__title">Your Liked Restaurant</h1>
      <section id="restaurant-list" class="restaurant-list"></section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantdb.getAllRestaurants();
    console.log('Restaurants:', restaurants);

    const restaurantContainer = document.querySelector('#restaurant');
    console.log('Restaurant container:', restaurantContainer);

    if (restaurants && restaurants.length > 0) {
      console.log('Rendering restaurants...');
      renderRestaurants(restaurants); // Pastikan fungsi renderRestaurants ini bekerja sesuai kebutuhan
    } else {
      console.log('No restaurants found.');
      restaurantContainer.innerHTML = '<li>No liked restaurants found.</li>';
    }
  },
};

export default Like;