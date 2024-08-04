setMainElementHeight()
document.addEventListener('DOMContentLoaded',navBarHamburgerMenu);
document.addEventListener('DOMContentLoaded',hideProjectHeaderTitle);

// Add an event listener for the resize event
window.addEventListener('resize', () => {
  setMainElementHeight();
})

function documentationDropdown() {
  console.log("-- accessed documentationDropdown")
  let divDocsDropdownContent = document.querySelector('.div_documentations_dropdown_content')

  // Set the divDocsDropdownContent element's CSS in line with the JavaScript
  var currentDropContent = window.getComputedStyle(divDocsDropdownContent).display;

  console.log("currentDropContent: " + currentDropContent)
  if (currentDropContent === "none"){

    console.log("--- It was NONE")
    // divDocsDropdownContent.style.display = "flex"
    divDocsDropdownContent.style.display = "inline-block"
  } 
  if (currentDropContent === "block") {
    console.log("--- It was inline-block")
    divDocsDropdownContent.style.display = "none"
  }

}

function navBarHamburgerMenu() {
  console.log("- scripts.js is accessed!")

  const hamburgerMenu = document.querySelector('.hamburger-menu');
  // Selects the first element in the document with the class 'hamburger-menu'.
  const navLinks = document.querySelector('.nav-links');
  const body = document.querySelector('body');

  hamburgerMenu.addEventListener('click', (event) => {
    // console.log('- clicked hamburger :))');
    navLinks.classList.toggle('nav-links-active');
    event.stopPropagation(); // Prevent body click event from firing immediately
    checkHeaderHeight()
  });

  // Function to close the nav links if click is outside
  const closeNavOnClickOutside = (event) => {
    if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      console.log('--> clicked outside nav');
      if (navLinks.classList.contains('nav-links-active')) {
        navLinks.classList.remove('nav-links-active');
      }
    }
  };

  body.addEventListener('click', closeNavOnClickOutside);

  // Optional: Stop propagation on nav links to prevent closing if clicked inside nav
  navLinks.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

// Function to set the height of the main element to the height of the headerNavBar element
function setMainElementHeight() {
  // Select the main element
  var mainElement = document.querySelector('main');

  // Select the headerNavBar element
  var headerNavBar = document.querySelector('header')

  // Set the height of the main element to the height of the headerNavBar element
  mainElement.style.marginTop = headerNavBar.offsetHeight + 'px';
}

function hideProjectHeaderTitle(){
  let divMarkdownTitle = document.querySelector('.h1_div_markdown_title')
  let pageName = document.querySelector('.page-name').querySelector('h1')
  if (divMarkdownTitle.textContent.length > 0){
    pageName.style.display = "none";
  } else { 
    pageName.style.display = "inline-block"
  }
  checkHeaderHeight()
}


function checkHeaderHeight(){
    // Select the main element
    var mainElement = document.querySelector('main');

    // Select the headerNavBar element
    var headerNavBar = document.querySelector('header')

    console.log(`headerNavBar.offsetHeight: ${headerNavBar.offsetHeight}`)
    console.log(`mainElement.style.marginTop: ${mainElement.style.marginTop}`)
}

