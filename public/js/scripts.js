setMainElementHeight()
document.addEventListener('DOMContentLoaded',navBarHamburgerMenu);

// Add an event listener for the resize event
window.addEventListener('resize', () => {
  setMainElementHeight();
})

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


