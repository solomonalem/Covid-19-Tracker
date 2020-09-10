//--------------- DOM - elements -----------------------------

var activeCasesEl = document.querySelector("#active-cases");
var totalCasesEl = document.querySelector("#total-cases");
var recoveredEl = document.querySelector("#recovered");
var totalDeathEl = document.querySelector("#total-death");

var todayCasesEl = document.querySelector("#today-cases");
var totalTestsEl = document.querySelector("#total-tests");
var todayRecoveredEl = document.querySelector("#today-recovered");
var todayDeathEl = document.querySelector("#today-death");

var countryInputName = document.querySelector("#country-input");
var searchBtn = document.querySelector("#search-btn");

// ----  Modal DOM Elements---
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector(".close");
const modalBody = document.querySelector(".modal-body");

// Modal Events
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideModalClick);

// Open Modal
function openModal(str) {
  modal.style.display = "block";
  var messageEl = document.createElement("p");
  messageEl.textContent = str;
  modalBody.appendChild(messageEl);
}

// Close Modal
function closeModal() {
  modal.style.display = "none";
  modalBody.textContent = "";
}

// Close If Outside Click
function outsideModalClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    modalBody.textContent = "";
  }
}

//----- FUNCTION- FETCH COUNTRY DATA  --------------------------------------------

var getCountryData = function (country) {
  var urlCountry =
    "https://disease.sh/v3/covid-19/countries/" +
    country +
    "?yesterday=false&strict=false";

  // fetch data for each country
  fetch(urlCountry).then((response) => {
    response.json().then((data) => {
      // if there is no response open modal with the error message
      if (data.message) {
        openModal(data.message);
      }

      // if there is response display data
      displayDataToTheUI(data);
    });
  });
};

//----- FUNCTION- DISPLAY DATA TO THE UI --------------------------------------------

var displayDataToTheUI = function (countryData) {
  // Display all the values to the UI
  activeCasesEl.textContent = numberWithCommas(countryData.active);
  recoveredEl.textContent = numberWithCommas(countryData.recovered);
  totalCasesEl.textContent = numberWithCommas(countryData.cases);
  totalDeathEl.textContent = numberWithCommas(countryData.deaths);

  todayCasesEl.textContent = numberWithCommas(countryData.todayCases);
  todayRecoveredEl.textContent = numberWithCommas(countryData.todayRecovered);
  totalTestsEl.textContent = numberWithCommas(countryData.tests);
  todayDeathEl.textContent = numberWithCommas(countryData.todayDeaths);
};

//----- FUNCTION- SUBMIT FORM  --------------------------------------------

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var countryName = countryInputName.value.trim();

  if (countryName) {
    localStorage.setItem("searchedCountry", countryName);
    getCountryData(countryName);

    countryInputName.value = "";
  } else {
    openModal("Input field can not be empty");
  }
};

//----- FUNCTION- LOAD PAGE ------------------------------------------------

var loadPage = function () {
  // get the last searched country name from localstorage
  var lastSearchedCountry = localStorage.getItem("searchedCountry");

  // get the data for the last searched country
  if (lastSearchedCountry) {
    getCountryData(lastSearchedCountry);
  }
  // if there was no searched country before search for USA
  getCountryData("usa");
};


loadPage();

searchBtn.addEventListener("submit", formSubmitHandler);

// AIzaSyC79QiLL6Ylj2jlS-iqNyJF3Cq2WdaquTc
