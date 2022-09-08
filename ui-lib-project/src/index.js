import Tooltip from "./ninja-ui/tooltip";
import Dropdown from "./ninja-ui/dropdown";
import Tabs from "./ninja-ui/tabs";
import Snackbar from "./ninja-ui/snackbar";

const tooltip = new Tooltip(document.querySelector(".tooltip"));
tooltip.init();

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const instance = new Dropdown(dropdown);
  instance.init();
});

const tabsContainer = new Tabs(document.querySelector(".tabs"));
tabsContainer.init();

const snackbar = new Snackbar();
const button = document.querySelector("button");
snackbar.init();
button.addEventListener("click", () => {
  snackbar.show("you clicked me :)");
});
