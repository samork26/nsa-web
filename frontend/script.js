document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

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

    // Check if user is logged in
    const loginButton = document.getElementById('loginButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userName = localStorage.getItem('userName');

    if (userName) {
        loginButton.style.display = 'none';
        welcomeMessage.style.display = 'block';
        welcomeMessage.textContent = `Hi, ${userName}!`;
    } else {
        loginButton.style.display = 'block';
        welcomeMessage.style.display = 'none';
    }

    // Function to create a user
    async function createUser(firstName, lastName, email, password) {
        const response = await fetch('/.netlify/functions/createUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        });
        const data = await response.json();
        console.log(data);
        return data;
    }

    // Event listener for registration form submission
    document.querySelector('form[action="/register"]').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const result = await createUser(firstName, lastName, email, password);
            // Handle the result (e.g., show a message to the user)
            if (result.message === 'User created successfully') {
                alert('Registration successful!');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed: ' + result.error);
            }
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    });
});

// Simulate storing the user's name after login (example usage)
function simulateLogin(userName) {
    localStorage.setItem('userName', userName);
}

// Example usage: Simulate a login with the user's name
// This would be triggered after a successful login, e.g., from a form submission or API call
simulateLogin('John Doe');  // Replace 'John Doe' with the actual logged-in user's name