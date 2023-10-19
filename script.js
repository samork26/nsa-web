// Select the hamburger element and menu
const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

// Add an event listener to the hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}))

