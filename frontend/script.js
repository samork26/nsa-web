// Select the hamburger element and menu
const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

// Add an event listener to the hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}));

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight &&
      rect.bottom >= 0
    );
};

const checkElements = () => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
};

// Initial check
checkElements();

// Event listener for scrolling
window.addEventListener('scroll', checkElements);

