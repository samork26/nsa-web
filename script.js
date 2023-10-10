// Select the hamburger element and menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Add an event listener to the hamburger
hamburger.addEventListener('click', () => {
    // Toggle the 'active' class on the menu whenever the hamburger is clicked
    menu.classList.toggle('active');
});
