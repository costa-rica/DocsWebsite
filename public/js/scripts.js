setMainElementHeight()

// Add an event listener for the resize event
window.addEventListener('resize', () => {
  setMainElementHeight();
  adjustDropdownHeightOnScreenSizeChange();
})

document.addEventListener('DOMContentLoaded', hideDocsWebTitle)

// window.addEventListener('resize',adjustDropdownHeightOnScreenSizeChange)

// document.addEventListener('DOMContentLoaded',navBarHamburgerMenu);

// // function documentationDropdown(){
// //   console.log("- in documentationDropdown()")
// // }
// function navBarHamburgerMenu() {
//   console.log("- in navBarHamburgerMenu()")
// }
// function setMainElementHeight() {
//   console.log("- in setMainElementHeight() ")
// }

document.addEventListener('DOMContentLoaded',checkValues);



function checkValues(){
  var headerNavBar = document.querySelector('header')
  console.log("headerNavBar.offsetHeight (checkValues): " + headerNavBar.offsetHeight + 'px')
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

function documentationDropdown() {
  console.log("-- accessed documentationDropdown")
  let divDocsDropdownContent = document.querySelector('.div_documentations_dropdown_content')

  // Set the divDocsDropdownContent element's CSS in line with the JavaScript
  var currentDropContent = window.getComputedStyle(divDocsDropdownContent).display;

  console.log("currentDropContent: " + currentDropContent)
  if (currentDropContent === "none"){
    divDocsDropdownContent.style.display = "inline-block"
    var headerNavBar = document.querySelector('header')
    // headerNavBar.offsetHeight is height of header / navbar dark gray
    let varHeight = headerNavBar.offsetHeight - 1
    divDocsDropdownContent.style.top = varHeight + 'px'
  } 
  if (currentDropContent === "block") {
    divDocsDropdownContent.style.display = "none"
  }
}

function adjustDropdownHeightOnScreenSizeChange(){
  let divDocsDropdownContent = document.querySelector('.div_documentations_dropdown_content')
  var headerNavBar = document.querySelector('header')
  let varHeight = headerNavBar.offsetHeight - 1
  divDocsDropdownContent.style.top = varHeight + 'px'
}

function hideDocsWebTitle(){
  let markdownTitle = document.querySelector('.h1_div_markdown_title')
  console.log("markdownTitle.length: " + markdownTitle.textContent.length)
  if (markdownTitle.textContent.length > 0){
    let pageName = document.querySelector('.page-name')
    pageName.style.display = "none"
  }
}

// function navBarHamburgerMenu() {
//   console.log("- scripts.js is accessed!")

//   const hamburgerMenu = document.querySelector('.hamburger-menu');
//   // Selects the first element in the document with the class 'hamburger-menu'.
//   const navLinks = document.querySelector('.nav-links');
//   const body = document.querySelector('body');

//   hamburgerMenu.addEventListener('click', (event) => {
//     // console.log('- clicked hamburger :))');
//     navLinks.classList.toggle('nav-links-active');
//     event.stopPropagation(); // Prevent body click event from firing immediately
//   });

//   // Function to close the nav links if click is outside
//   const closeNavOnClickOutside = (event) => {
//     if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
//       console.log('--> clicked outside nav');
//       if (navLinks.classList.contains('nav-links-active')) {
//         navLinks.classList.remove('nav-links-active');
//       }
//     }
//   };

//   body.addEventListener('click', closeNavOnClickOutside);

//   // Optional: Stop propagation on nav links to prevent closing if clicked inside nav
//   navLinks.addEventListener('click', (event) => {
//     event.stopPropagation();
//   });
// }





