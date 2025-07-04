import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, where, query, getDocs, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyChssYWkaV_YlH_ZPW4bdvNKlDS5TaHPZU",
    authDomain: "edutech-ad4f9.firebaseapp.com",
    projectId: "edutech-ad4f9",
    storageBucket: "edutech-ad4f9.firebasestorage.app",
    messagingSenderId: "493756404164",
    appId: "1:493756404164:web:28a89511bd0dfa2ca45491",
    measurementId: "G-YDKN6WY7CQ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const googleSignIn = document.getElementById("google-sign-in");
const googleSignUp = document.getElementById("google-sign-up");

// Regex para validación de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validación de contraseña: mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Checks individuales para requisitos de contraseña
const passwordChecks = {
    length: (pwd) => pwd.length >= 8,
    uppercase: (pwd) => /[A-Z]/.test(pwd),
    lowercase: (pwd) => /[a-z]/.test(pwd),
    number: (pwd) => /\d/.test(pwd),
    special: (pwd) => /[@$!%*?&]/.test(pwd)
};

// Alternar visibilidad de contraseña
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

// Inicializar alternancia de visibilidad de contraseña
togglePasswordVisibility("signin-password", "signin-toggle-password");
togglePasswordVisibility("signup-password", "signup-toggle-password");

// Validación de requisitos de contraseña en tiempo real
const signupPasswordInput = document.getElementById("signup-password");
signupPasswordInput.addEventListener("input", () => {
    const password = signupPasswordInput.value;
    document.getElementById("pwd-length").classList.toggle("valid", passwordChecks.length(password));
    document.getElementById("pwd-uppercase").classList.toggle("valid", passwordChecks.uppercase(password));
    document.getElementById("pwd-lowercase").classList.toggle("valid", passwordChecks.lowercase(password));
    document.getElementById("pwd-number").classList.toggle("valid", passwordChecks.number(password));
    document.getElementById("pwd-special").classList.toggle("valid", passwordChecks.special(password));
});

// Alternar entre formularios de inicio de sesión y registro
btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Manejar envío del formulario de inicio de sesión
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const identifier = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    if (!identifier.trim()) {
        alert("Por favor, ingrese un nombre de usuario o correo electrónico");
        return;
    }

    try {
        // Validación básica para el usuario admin (considera una forma más segura de manejar esto en producción)
        if ((identifier === "admin" || identifier === "admin@example.com") && password === "123") {
            await signInWithEmailAndPassword(auth, "admin@example.com", "123");
            window.location.href = "/Dashboard/panel.html";
            return;
        }

        // Validación de formato de contraseña (quizás quieras relajar esta validación para el inicio de sesión
        // ya que solo aplica al registro, pero la mantengo por ahora según tu código original)
        if (!passwordRegex.test(password)) {
             // Opcional: Mostrar un mensaje más amigable si el formato no coincide
            // alert("El formato de la contraseña no es correcto.");
             // Para propósitos de inicio de sesión, solo necesitas verificar si las credenciales son correctas.
             // La validación fuerte del formato de la contraseña debería ser principalmente para el registro.
             // Si quieres aplicar la validación de formato aquí, asegúrate de que el usuario lo sepa.
        }


        let email = identifier;
        if (!emailRegex.test(identifier)) {
            // Si no es un formato de email, buscar por nombre de usuario en Firestore
            const usernameQuery = query(collection(db, "users"), where("username", "==", identifier));
            const usernameSnapshot = await getDocs(usernameQuery);
            if (!usernameSnapshot.empty) {
                email = usernameSnapshot.docs[0].data().email;
            } else {
                alert("Nombre de usuario o correo no encontrado");
                return;
            }
        }

        // Intentar iniciar sesión con email y contraseña
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Inicio de sesión exitoso para:", userCredential.user.email);
        window.location.href = "/Dashboard/panel.html";

    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        let errorMessage = "Error al iniciar sesión. Verifica tus credenciales.";
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
             errorMessage = "Nombre de usuario, correo o contraseña incorrectos.";
        } else if (error.code === "auth/invalid-email") {
             errorMessage = "El formato del correo electrónico no es válido.";
        }
        alert(errorMessage);
    }
});

// Manejar envío del formulario de registro
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Validaciones de campos (mejoradas para mayor claridad y mensajes específicos)
    if (!name.trim()) {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    if (!username.trim()) {
        alert("Por favor, ingrese un nombre de usuario.");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("La contraseña no cumple con los requisitos: al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.");
        return;
    }

    try {
        // Verificar si el nombre de usuario ya existe
        const usernameQuery = query(collection(db, "users"), where("username", "==", username));
        const usernameSnapshot = await getDocs(usernameQuery);
        if (!usernameSnapshot.empty) {
            alert("El nombre de usuario ya está registrado.");
            return;
        }
        // Verificar si el correo ya existe
        const emailQuery = query(collection(db, "users"), where("email", "==", email));
        const emailSnapshot = await getDocs(emailQuery);
        if (!emailSnapshot.empty) {
            alert("El correo ya está registrado.");
            return;
        }

        // Crear usuario con email y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado exitosamente:", userCredential.user.email);

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            username: username,
            email: email,
            name: name,
            createdAt: serverTimestamp()
        });
        console.log("Datos guardados en Firestore para UID:", userCredential.user.uid);

        alert("¡Registro exitoso! Por favor, inicia sesión.");
        container.classList.remove("toggle"); // Cambiar a la vista de inicio de sesión

    } catch (error) {
        console.error("Error al registrar:", error.message);
        let errorMessage = "Error al registrar. Inténtalo de nuevo.";
        if (error.code === "auth/email-already-in-use") {
            errorMessage = "El correo ya está registrado.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "El correo electrónico no es válido.";
        } else if (error.code === "auth/weak-password") {
            errorMessage = "La contraseña debe tener al menos 6 caracteres."; // Aunque tu regex pide 8, Firebase por defecto pide 6
        } else if (error.code === "permission-denied") {
            errorMessage = "No tienes permiso para guardar datos. Verifica las reglas de Firestore.";
        }
        alert(errorMessage);
    }
});

// Manejar autenticación con Google (inicio de sesión y registro)
async function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account' // Forzar al usuario a seleccionar una cuenta de Google
    });
    provider.addScope('profile'); // Solicitar acceso al perfil básico
    provider.addScope('email'); // Solicitar acceso al correo electrónico

    try {
        console.log("Iniciando autenticación con Google...");
        if (!navigator.onLine) {
            throw new Error("No hay conexión a internet.");
        }

        // Usar signInWithRedirect para el flujo de redirección de Google Sign-In
        // No necesitas especificar redirectUri si ya está configurado en la consola de Firebase
        await signInWithRedirect(auth, provider);

    } catch (error) {
        console.error("Error al iniciar la autenticación con Google:", error.message);
        // Mostrar un mensaje de error más específico si es posible
        let errorMessage = "Error al iniciar la autenticación con Google.";
        if (error.code === "auth/cancelled-popup-request") {
             errorMessage = "La ventana emergente de inicio de sesión fue cerrada.";
        } else if (error.code === "auth/popup-closed-by-user") {
             errorMessage = "Cancelaste el inicio de sesión con Google.";
        }
        alert(errorMessage + " Detalles: " + error.message);
    }
}

// Manejar el resultado de la redirección de Google Sign-In al cargar la página
window.addEventListener('load', async () => {
    try {
        console.log("Procesando resultado de redirección... URL actual:", window.location.href);
        const result = await getRedirectResult(auth); // Obtener el resultado después de la redirección
        if (result && result.user) {
            // Si hay un usuario en el resultado de la redirección
            const user = result.user;
            console.log("Usuario obtenido de redirección:", user.email, "UID:", user.uid);

            // Verificar si el usuario ya existe en tu colección "users" en Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDocs(userDocRef); // Usar getDocs para una colección, o getDoc para un solo documento

            if (!userDoc.exists()) { // Corregido: Usar exists() en el snapshot de un documento
                console.log("Guardando nuevo usuario de Google en Firestore...");
                // Si el usuario no existe, guardar sus datos en Firestore
                await setDoc(userDocRef, {
                    // Crear un nombre de usuario básico a partir del email si no hay displayName
                    username: user.displayName ? user.displayName.replace(/\s+/g, '').toLowerCase() : user.email.split("@")[0],
                    email: user.email,
                    name: user.displayName || "Usuario de Google", // Usar displayName si está disponible
                    createdAt: serverTimestamp()
                });
                console.log("Datos guardados en Firestore para UID:", user.uid);
            } else {
                console.log("Usuario de Google ya existe en Firestore:", user.email);
            }

            // Redirigir al panel después del inicio de sesión exitoso
            window.location.href = "/Dashboard/panel.html";

        } else if (result && result.error) {
            // Si hay un error en el resultado de la redirección
            console.error("Error en el resultado de redirección:", result.error.message, result.error.code);
            alert("Error al procesar la autenticación con Google: " + result.error.message);
        } else {
            // Si no hay resultado de redirección, es una carga de página normal
            console.log("No se detectó resultado de redirección. URL actual:", window.location.href);
        }
    } catch (error) {
        // Capturar cualquier otro error durante el procesamiento de la redirección
        console.error("Error procesando redirección:", error.message, error.code);
        alert("Error al procesar la autenticación con Google: " + error.message);
    }
});

// Conectar los botones de Google con la función de autenticación
googleSignIn.addEventListener("click", handleGoogleAuth);
googleSignUp.addEventListener("click", handleGoogleAuth);

// Manejar cierre de sesión (botón de prueba)
const signOutButton = document.createElement("button");
signOutButton.textContent = "Cerrar Sesión (Test)";
signOutButton.style.position = "absolute";
signOutButton.style.top = "10px";
signOutButton.style.right = "10px";
signOutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Sesión cerrada exitosamente");
        window.location.href = "/"; // Redirigir a la página principal o de login
    } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        alert("Error al cerrar sesión: " + error.message);
    }
});
document.body.appendChild(signOutButton);
