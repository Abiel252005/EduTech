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

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyChssYWkaV_YlH_ZPW4bdvNKlDS5TaHPZU",
    authDomain: "edutech-ad4f9.firebaseapp.com",
    projectId: "edutech-ad4f9",
    storageBucket: "edutech-ad4f9.firebasestorage.app",
    messagingSenderId: "493756404164",
    appId: "1:493756404164:web:28a89511bd0dfa2ca45491",
    measurementId: "G-YDKN6WY7CQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);