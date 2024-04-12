import data from "./data.json" assert { type: "json" };

function createMenu(dish) {
    const item = data.dishes[dish];
    item.forEach(value => {
        document.querySelector(`.${dish}`).innerHTML += `<li>
        <div class="menu-card hover:card">
          <figure
            class="card-banner img-holder"
            style="--width: 100; --height: 100"
          >
            <img
              src=${value.img_link}
              width="100"
              height="100"
              loading="lazy"
              alt=${value.name}
            />
          </figure>
      
          <div>
            <div class="title-wrapper">
              <h3 class="title-3">
                <a href="#" class="card-title">${value.name}</a>
              </h3>
      
              <span class="span title-2">${value.price}</span>
            </div>
      
            <div class="menu-box">
              <button class="add-to-cart-btn"><a href=${value.url}>Buy</a></button>
            </div>
          </div>
        </div>
      </li>`;
    })
}

document.addEventListener('DOMContentLoaded', function () {
   createMenu("soups");
   createMenu("swallows");
   createMenu("intercontinentals");
});

