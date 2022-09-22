import Forecast from "./forecast";
import "./styles/main.css";

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = ({ cityDetails, weather }) => {
  details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>°C</span>
      </div>
    </div>
  `;

  weather.IsDayTime
    ? (time.src = "assets/img/day.svg")
    : (time.src = "assets/img/night.svg");
  icon.src = `assets/img/icons/${weather.WeatherIcon}.svg`;

  if (card.classList.contains("d-none")) card.classList.remove("d-none");
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.elements.city.value.trim();
  cityForm.reset();

  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.error(err));

  localStorage.setItem("city", city);
});

const city = localStorage.getItem("city");
if (city) {
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.error(err));
}
