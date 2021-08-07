import Background from './background.js'

const brandTabs = document.querySelectorAll(".brand-bg");
const brandIndis = document.querySelectorAll(".brand-indi div");

const parksTabs = document.querySelectorAll(".atomypark-bg");
const parksIndis = document.querySelectorAll(".atomypark-indi div");

const brandBg = new Background(brandTabs, brandIndis, 4);
const atomyparkBg = new Background(parksTabs, parksIndis, 3);

