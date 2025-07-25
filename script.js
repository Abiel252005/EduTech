import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js';

// Configuración de Firebase (debe completarse con credenciales reales)
const firebaseConfig = {
  apiKey: "AIzaSyChssYWkaV_YlH_ZPW4bdvNKlDS5TaHPZU",
  authDomain: "edutech-ad4f9.firebaseapp.com",
  projectId: "edutech-ad4f9",
  storageBucket: "edutech-ad4f9.firebasestorage.app",
  messagingSenderId: "493756404164",
  appId: "1:493756404164:web:28a89511bd0dfa2ca45491",
  measurementId: "G-YDKN6WY7CQ"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const googleSignIn = document.getElementById("google-sign-in");
const googleSignUp = document.getElementById("google-sign-up");

// Default admin user
const users = [
    { username: "admin", email: "admin@example.com", password: "123", name: "Admin" }
];

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Individual password requirement checks
const passwordChecks = {
    length: (pwd) => pwd.length >= 8,
    uppercase: (pwd) => /[A-Z]/.test(pwd),
    lowercase: (pwd) => /[a-z]/.test(pwd),
    number: (pwd) => /\d/.test(pwd),
    special: (pwd) => /[@$!%*?&]/.test(pwd)
};

// Toggle password visibility
function togglePasswordVisibility(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);
    if (passwordInput && toggleIcon) {
        toggleIcon.addEventListener("click", () => {
            const type = passwordInput.type === "password" ? "text" : "password";
            passwordInput.type = type;
            toggleIcon.classList.toggle("bi-eye", type === "password");
            toggleIcon.classList.toggle("bi-eye-slash", type === "text");
        });
    }
}

// Initialize password visibility toggles
togglePasswordVisibility("signin-password", "signin-toggle-password");
togglePasswordVisibility("signup-password", "signup-toggle-password");

// Real-time password requirement validation
const signupPasswordInput = document.getElementById("signup-password");
if (signupPasswordInput) {
    signupPasswordInput.addEventListener("input", () => {
        const password = signupPasswordInput.value;
        document.getElementById("pwd-length")?.classList.toggle("valid", passwordChecks.length(password));
        document.getElementById("pwd-uppercase")?.classList.toggle("valid", passwordChecks.uppercase(password));
        document.getElementById("pwd-lowercase")?.classList.toggle("valid", passwordChecks.lowercase(password));
        document.getElementById("pwd-number")?.classList.toggle("valid", passwordChecks.number(password));
        document.getElementById("pwd-special")?.classList.toggle("valid", passwordChecks.special(password));
    });
}

// Toggle between sign-in and sign-up forms
btnSignIn?.addEventListener("click", () => {
    container?.classList.remove("toggle");
});

btnSignUp?.addEventListener("click", () => {
    container?.classList.add("toggle");
});

// Handle sign-in form submission
signInForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const identifier = document.getElementById("signin-username")?.value;
    const password = document.getElementById("signin-password")?.value;

    // Validate identifier (username or email)
    if (!identifier?.trim()) {
        alert("Por favor, ingrese un nombre de usuario o correo electrónico");
        return;
    }

    // Allow admin user to bypass password validation
    if ((identifier === "admin" || identifier === "admin@example.com") && password === "123") {
        window.location.href = "/Dashboard/panel.html";
        return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial");
        return;
    }

    // Check if identifier matches username or email and password matches
    const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);
    if (user) {
        window.location.href = "/Dashboard/panel.html";
    } else {
        alert("Nombre de usuario/correo o contraseña incorrectos");
    }
});

// Handle sign-up form submission
signUpForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name")?.value;
    const username = document.getElementById("signup-username")?.value;
    const email = document.getElementById("signup-email")?.value;
    const password = document.getElementById("signup-password")?.value;

    // Validate name
    if (!name?.trim()) {
        alert("Por favor, ingrese su nombre");
        return;
    }

    // Validate username
    if (!username?.trim()) {
        alert("Por favor, ingrese un nombre de usuario");
        return;
    }

    // Validate email
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial");
        return;
    }

    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
        alert("El nombre de usuario ya está registrado");
        return;
    }
    if (users.some(u => u.email === email)) {
        alert("El correo ya está registrado");
        return;
    }

    // Add new user
    users.push({ username, email, password, name });
    alert("¡Registro exitoso! Por favor, inicia sesión.");
    container?.classList.remove("toggle");
});

// Handle Google sign-in and sign-up
function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // Check if user exists in local array, if not, add them
            if (!users.some(u => u.email === user.email)) {
                users.push({
                    username: user.email.split('@')[0],
                    email: user.email,
                    password: null, // Google users don't need local password
                    name: user.displayName || "Google User"
                });
            }
            console.log('Usuario autenticado con Google:', user);
            window.location.href = "/Dashboard/panel.html";
        })
        .catch((error) => {
            console.error("Error al autenticar con Google: ", error.message);
            alert("Error al autenticar con Google: " + error.message);
        });
}

googleSignIn?.addEventListener("click", handleGoogleAuth);
googleSignUp?.addEventListener("click", handleGoogleAuth);

console.log('Autenticación con Google habilitada.');