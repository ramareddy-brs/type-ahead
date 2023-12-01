const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const cities = [...data];

let chathams_blue = "#1A4B84";

const matchInput = (inputString, cities) =>
  cities.filter(
    ({ city, state }) =>
      city.match(new RegExp(inputString, "gi")) ||
      state.match(new RegExp(inputString, "gi"))
  );

const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const displayMatches = (el) => {
  const matchArray = matchInput(el.value, cities);
  console.log(matchArray);
  const suggestionList = matchArray
    .map((location) => {
      const regex = new RegExp(el.value, "gi");
      
      const cityName = location.city.replace(
        regex,
        `<span class ="hl">${el.value}</span>`
      );
      const stateName = location.state.replace(
        regex,
        `<span class="hl">${el.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(location.population)}</span>
      </li>`;
    })
    .join("");

  suggestions.innerHTML = suggestionList;
};

searchInput.addEventListener("keyup", (e) => displayMatches(searchInput));

function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}

setTheme(localStorage.getItem("movie-theme") || chathams_blue);