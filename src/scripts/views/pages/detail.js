import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import UrlParser from '../../routes/url-parser';
import {
  restaurantDetail,
  restaurantCustomerReviewsDetail,
} from '../template/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
// import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
      <section id="restaurant" class="restaurant"></section>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    const RestaurantContainer = document.querySelector('#restaurant');
    RestaurantContainer.innerHTML = restaurantDetail(restaurant);

    if (restaurant) {
      console.log(restaurant); // Debugging: cek isi data restaurant

      // const restaurantContainer = document.getElementById('restaurant');
      // restaurantContainer.innerHTML = restaurantDetail(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          description: restaurant.description,
        },
      });

      // Panggil fungsi _detailRestaurantMenus hanya jika data menus ada
      if (restaurant.menus) {
        this._detailRestaurantMenus(restaurant);
      } else {
        console.error('Restaurant menus data not found');
      }

      // Panggil fungsi _renderCustomerReviews untuk menampilkan customer reviews
      if (restaurant.customerReviews) {
        this._renderCustomerReviews(restaurant.customerReviews);
      } else {
        console.error('Customer reviews data not found');
      }
    } else {
      console.error('Restaurant data not found');
    }
  },

  _detailRestaurantMenus(restaurant) {
    // Pastikan 'foods' dan 'drinks' terdefinisi di 'menus'
    if (restaurant.menus.foods && restaurant.menus.drinks) {
      // Render the food menu
      const foodsContainer = document.querySelector('#foods');
      restaurant.menus.foods.forEach((food) => {
        foodsContainer.innerHTML += `<li>${food.name}</li>`;
      });

      // Render the drinks menu
      const drinksContainer = document.querySelector('#drinks');
      restaurant.menus.drinks.forEach((drink) => {
        drinksContainer.innerHTML += `<li>${drink.name}</li>`;
      });
    } else {
      console.error('Foods or drinks data not found in restaurant menus');
    }
  },

  _renderCustomerReviews(reviews) {
    const reviewsContainer = document.getElementById('customerReviews');
    reviewsContainer.innerHTML = ''; // Bersihkan konten sebelumnya

    // Render setiap review ke dalam elemen 'customerReviews'
    reviews.forEach((review) => {
      reviewsContainer.innerHTML += restaurantCustomerReviewsDetail(review);
    });
  },
};

export default Detail;