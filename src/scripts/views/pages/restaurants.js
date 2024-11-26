import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { renderRestaurants } from '../template/template-creator'; // Assuming this function exists to render restaurant items

const Restaurants = {
  async render() {
    return `
      <h2>Restaurant Page</h2>
      <ul id="restaurant-list" class="restaurant-list"></ul>
    `;
  },

  async afterRender() {
    try {
      // Fetch the list of restaurants from the data source
      const restaurants = await TheRestaurantDbSource.listRestaurants();

      // Check if there are any restaurants and render them
      if (restaurants && restaurants.length > 0) {
        renderRestaurants(restaurants);
      } else {
        document.getElementById('restaurant-list').innerHTML =
          '<li>No restaurants found.</li>';
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      document.getElementById('restaurant-list').innerHTML =
        '<li>Failed to load restaurants.</li>';
    }
  },
};

export default Restaurants;