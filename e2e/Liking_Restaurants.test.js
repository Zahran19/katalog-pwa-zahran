const assert = require('assert');

Feature('Restaurant Favorites Management');

Before(({ I }) => {
  I.amOnPage('/');
});

Feature('Liking Restaurants');

Scenario('showing empty favorite restaurants initially', async ({ I }) => {
  I.amOnPage('/#/like');
  I.seeElement('#main-content');
  I.dontSeeElement(
    '.restaurant-list',
    'No restaurants should be favorited yet'
  );
});

Scenario('liking and verifying a restaurant in favorites', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.restaurant-list');

  // Store initial restaurant data
  I.waitForElement('.headline__content h1 a.restaurant-name', 10); // Tunggu hingga elemen restoran dimuat
  const firstRestaurant = locate(
    '.headline__content h1 a.restaurant-name'
  ).first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // Like the restaurant
  I.click(firstRestaurant);
  I.seeElement('#likeButton');

  I.click('#likeButton'); // Klik tombol like

  // Verifikasi perubahan status tombol 'like'
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'unlike this restaurant',
  });

  // Verifikasi halaman favorit
  I.amOnPage('/#/like');
  I.seeElement('.restaurant-list');
  const likedRestaurantTitle = await I.grabTextFrom(
    '.headline__content h1 a.restaurant-name'
  );
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Verifikasi jumlah restoran yang disukai
  const favoriteRestaurants =
    await I.grabNumberOfVisibleElements('.restaurant-list');
  assert.strictEqual(
    favoriteRestaurants,
    1,
    'Should only have one favorite restaurant'
  );
});
