'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedLink = this; // `this` is the clicked navLink

    // Deactivate all other navigation links and all pages
    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k] !== clickedLink) {
        navigationLinks[k].classList.remove("active");
      }
    }
    for (let k = 0; k < pages.length; k++) {
      pages[k].classList.remove("active");
    }

    // Activate the clicked navigation link
    clickedLink.classList.add("active");

    // Find and activate the corresponding page
    const clickedLinkText = clickedLink.innerHTML.toLowerCase();
    // Handle cases where data-page might be explicitly set on the nav link
    const clickedLinkDataPage = clickedLink.dataset.page ? clickedLink.dataset.page.toLowerCase() : null; 

    for (let j = 0; j < pages.length; j++) {
      const pageName = pages[j].dataset.page.toLowerCase();
      let match = false;

      if (clickedLinkDataPage && clickedLinkDataPage === pageName) {
        // Match if nav link's data-page attribute equals the page's data-page
        match = true;
      } else if (!clickedLinkDataPage && clickedLinkText.includes(pageName)) {
        // Match if nav link text includes the page's data-page name (and nav link has no data-page attribute)
        // This handles "Resume & Portfolio" (text) matching "resume" (data-page)
        // To be more specific for "Resume & Portfolio":
        if (clickedLinkText === "resume & portfolio") {
          if (pageName === "resume") {
            match = true;
          } else {
            match = false; // "Resume & Portfolio" should only match "resume"
          }
        } else {
          match = true; // For other links like "About", general includes is fine
        }
      }

      if (match) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
        break; // Found and activated the target page, no need to check further
      }
    }
  });
}