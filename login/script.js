const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const signInForm = document.getElementById("sign-in-form");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Handle sign-in form submission
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Redirect to panel.html upon successful sign-in
    window.location.href = "panel.html";
});