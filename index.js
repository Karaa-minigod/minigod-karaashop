// index.js

// ⚠️ Assurez-vous que cette URL de base est correcte (votre serveur tourne sur le port 5000)
const BASE_URL = 'http://localhost:5000/api/users'; 

// --- 1. Logique de la Bascule (Toggle) ---
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// --- 2. Fonctions d'Appel API ---

async function handleSignUp(name, email, password) {
    try {
        const response = await fetch(BASE_URL, { // POST vers /api/users
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert(`Bienvenue, ${data.name} ! Inscription réussie.`);
            window.location.href = './products.html'; 
        } else {
            // Affichera l'erreur du Back-end (ex: "Cet utilisateur existe déjà")
            alert(`Erreur d'inscription : ${data.message || response.statusText}`);
        }
    } catch (error) {
        console.error("Erreur réseau ou du serveur :", error);
        // Le message d'erreur de l'image
        alert("Une erreur est survenue lors de l'inscription. Vérifiez que le serveur est démarré.");
    }
}

async function handleLogin(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, { // POST vers /api/users/login
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert(`Connexion réussie !`);
            window.location.href = './products.html'; 
        } else {
            alert(`Erreur de connexion : ${data.message || response.statusText}`);
        }
    } catch (error) {
        console.error("Erreur réseau ou du serveur :", error);
        alert("Une erreur est survenue lors de la connexion. Vérifiez que le serveur est démarré.");
    }
}


// --- 3. Écouteurs de Soumission des Formulaires ---

// Formulaire d'inscription
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    handleSignUp(name, email, password);
});

// Formulaire de connexion
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    handleLogin(email, password);
});