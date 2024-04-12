import data from "./data.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const dish = urlParams.get("dish");
  const index = urlParams.get("index");

  const item = data.dishes[dish][index];

  var ingredient = "";
  item["ingredients"].forEach((value) => {
    ingredient += `<li>
      <p class="body-4">${value}</p>
    </li>`;
  });

  document.querySelector(`.dish_bio`).innerHTML += `
  <div class="special-dish-banner"> <img  width="940"
  height="900"
  loading="lazy"
  alt="special dish"
  class="img-cover" src=${item.img_link} alt=${item.name} /></div>
 
  <div class="special-dish-content bg-black-10">
  <h1 class="headline-1 section-title">${item.name}</h1>
          
          <h2 class="title-1">Ingredients</h2>
          <ul>
              ${ingredient}
          </ul>
          <div class="wrapper">
                <span class="span body-1">${item.price}</span>
              </div>

              <a onclick="order('${item.name} -- Inhouse')" href="#" class="btn btn-primary">
                <span class="text text-1">Order to Table</span>

                <span class="text text-2" aria-hidden="true"
                  >Order to Table</span
                >
              </a>

              <a onclick="order('${item.name} -- Delivery')" href="#" class="btn btn-primary">
              <span class="text text-1">Order Delivery</span>

              <span class="text text-2" aria-hidden="true"
                >Order Delivery</span
              >
            </a>
            </div?
          `;
});

