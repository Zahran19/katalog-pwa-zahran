const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario(
  'unliking and verifying a restaurant is removed from favorites',
  async ({ I }) => {
    I.amOnPage('/');
    const firstRestaurant = locate(
      '.headline__content h1 a.restaurant-name'
    ).first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

    I.click(firstRestaurant);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    const likedRestaurantTitle = await I.grabTextFrom(
      '.headline__content h1 a.restaurant-name'
    );
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

    I.click(locate('.headline__content h1 a.restaurant-name').first());
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.wait(2);
  }
);
