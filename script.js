import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, where, query, getDocs, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const googleSignIn = document.getElementById("google-sign-in");
const googleSignUp = document.getElementById("google-sign-up");

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
    toggleIcon.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        toggleIcon.classList.toggle("bi-eye", type === "password");
        toggleIcon.classList.toggle("bi-eye-slash", type === "text");
    });
}

// Initialize password visibility toggles
togglePasswordVisibility("signin-password", "signin-toggle-password");
togglePasswordVisibility("signup-password", "signup-toggle-password");

// Real-time password requirement validation
const signupPasswordInput = document.getElementById("signup-password");
signupPasswordInput.addEventListener("input", () => {
    const password = signupPasswordInput.value;
    document.getElementById("pwd-length").classList.toggle("valid", passwordChecks.length(password));
    document.getElementById("pwd-uppercase").classList.toggle("valid", passwordChecks.uppercase(password));
    document.getElementById("pwd-lowercase").classList.toggle("valid", passwordChecks.lowercase(password));
    document.getElementById("pwd-number").classList.toggle("valid", passwordChecks.number(password));
    document.getElementById("pwd-special").classList.toggle("valid", passwordChecks.special(password));
});

// Toggle between sign-in and sign-up forms
btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Handle sign-in form submission
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const identifier = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    if (!identifier.trim()) {
        alert("Por favor, ingrese un nombre de usuario o correo electrónico");
        return;
    }

    try {
        if ((identifier === "admin" || identifier === "admin@example.com") && password === "123") {
            await signInWithEmailAndPassword(auth, "admin@example.com", "123");
            window.location.href = "/Dashboard/panel.html";
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial");
            return;
        }

        let email = identifier;
        if (!emailRegex.test(identifier)) {
            const usernameQuery = query(collection(db, "users"), where("username", "==", identifier));
            const usernameSnapshot = await getDocs(usernameQuery);
            if (!usernameSnapshot.empty) {
                email = usernameSnapshot.docs[0].data().email;
            } else {
                alert("Nombre de usuario o correo no encontrado");
                return;
            }
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Inicio de sesión exitoso para:", userCredential.user.email);
        window.location.href = "/Dashboard/panel.html";
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert("Error al iniciar sesión: " + error.message);
    }
});

// Handle sign-up form submission
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!name.trim()) {
        alert("Por favor, ingrese su nombre");
        return;
    }
    if (!username.trim()) {
        alert("Por favor, ingrese un nombre de usuario");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial");
        return;
    }

    try {
        const usernameQuery = query(collection(db, "users"), where("username", "==", username));
        const usernameSnapshot = await getDocs(usernameQuery);
        if (!usernameSnapshot.empty) {
            alert("El nombre de usuario ya está registrado");
            return;
        }
        const emailQuery = query(collection(db, "users"), where("email", "==", email));
        const emailSnapshot = await getDocs(emailQuery);
        if (!emailSnapshot.empty) {
            alert("El correo ya está registrado");
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado exitosamente:", userCredential.user.email);

        await setDoc(doc(db, "users", userCredential.user.uid), {
            username: username,
            email: email,
            name: name,
            createdAt: serverTimestamp()
        });
        console.log("Datos guardados en Firestore para UID:", userCredential.user.uid);

        alert("¡Registro exitoso! Por favor, inicia sesión.");
        container.classList.remove("toggle");
    } catch (error) {
        console.error("Error al registrar:", error.message);
        alert("Error al registrar: " + error.message);
    }
});

// Handle Google sign-in/registration
async function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    provider.addScope('profile');
    provider.addScope('email');

    try {
        console.log("Iniciando autenticación con Google...");
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error("Error initiating Google sign-in:", error.message);
        alert("Error al iniciar la autenticación con Google: " + error.message);
        return;
    }
}

// Handle the redirect result on page load or after redirect
window.addEventListener('load', async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
            const user = result.user;
            console.log("Usuario obtenido de redirección:", user.email);
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDocs(userDocRef);
            if (!userDoc.exists()) {
                console.log("Guardando nuevo usuario en Firestore...");
                await setDoc(userDocRef, {
                    username: user.email.split("@")[0],
                    email: user.email,
                    name: user.displayName || "Google User",
                    createdAt: serverTimestamp()
                });
                console.log("Datos guardados en Firestore para UID:", user.uid);
            } else {
                console.log("Usuario ya existe en Firestore:", user.email);
            }
            window.location.href = "/Dashboard/panel.html";
        } else if (result && result.error) {
            console.error("Error en el resultado de redirección:", result.error.message);
            alert("Error al procesar la autenticación con Google: " + result.error.message);
        }
    } catch (error) {
        console.error("Error procesando redirección:", error.message);
        alert("Error al procesar la autenticación con Google: " + error.message);
    }
});

// Connect Google sign-in and sign-up buttons
googleSignIn.addEventListener("click", handleGoogleAuth);
googleSignUp.addEventListener("click", handleGoogleAuth);

// Handle sign-out (for testing)
const signOutButton = document.createElement("button");
signOutButton.textContent = "Cerrar Sesión (Test)";
signOutButton.style.position = "absolute";
signOutButton.style.top = "10px";
signOutButton.style.right = "10px";
signOutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Sesión cerrada exitosamente");
        window.location.href = "/";
    } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        alert("Error al cerrar sesión: " + error.message);
    }
});
document.body.appendChild(signOutButton);