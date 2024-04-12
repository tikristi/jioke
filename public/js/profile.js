document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/api')
    .then(data => {
    return data.json();
    }).then(profile => {

        var orders = "";
        profile["orders"].forEach((value) => {
          orders += `<li>
            <p class="body-4">${value}</p>
          </li>`;
        });

        document.querySelector(`.profile`).innerHTML += `<h1 class="headline-1 section-title">${profile.username}</h1>
        <h2>Previous Orders</h2>
        <ul>
          ${orders}
        </ul>

        <a href="/logout" class="btn btn-primary">
          <span class="text text-1">Logout</span>

          <span class="text text-2" aria-hidden="true">Logout</span>
        </a> `;
    });
});
