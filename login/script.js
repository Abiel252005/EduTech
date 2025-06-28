const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const googleSignIn = document.getElementById("google-sign-in");
const googleSignUp = document.getElementById("google-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Handle sign-in with email and password
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    signInWithEmailPassword(email, password);
});

// Handle sign-up with email and password
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    signUpWithEmailPassword(email, password);
});

// Sign in with email and password
function signInWithEmailPassword(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario ha iniciado sesión:", user.email);
            window.location.href = "panel.html";
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.message);
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Sign up with email and password
function signUpWithEmailPassword(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario registrado:", user.email);
            window.location.href = "panel.html";
        })
        .catch((error) => {
            console.error("Error al registrar:", error.message);
            alert("Error al registrar: " + error.message);
        });
}

// Sign in with Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Inicio de sesión con Google exitoso:", user.displayName);
            window.location.href = "panel.html";
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Google:", error.message);
            alert("Error al iniciar sesión con Google: " + error.message);
        });
}

// Connect Google sign-in and sign-up buttons
googleSignIn.addEventListener("click", signInWithGoogle);
googleSignUp.addEventListener("click", signInWithGoogle); // Same flow for simplicity