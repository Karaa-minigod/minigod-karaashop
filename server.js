// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); 
const path = require('path');
const cors = require('cors'); 

// 🔑 VÉRIFIEZ LE CHEMIN : Importation des middlewares d'erreur
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); 

dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middlewares standards
app.use(express.json()); // Permet d'analyser le corps des requêtes JSON
app.use(cors()); // Active CORS pour les requêtes Front-end/Back-end

// 🔗 CONFIGURATION DU DOSSIER STATIQUE (Images et autres fichiers publics)
app.use(express.static(path.join(__dirname, 'public')));


// 🧭 Routes API
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 


// 🛑 Middlewares de Gestion d'Erreurs (Doivent être placés APRES les routes)
// 1. Gestionnaire 404 (Si aucune route n'est trouvée)
app.use(notFound); 
// 2. Gestionnaire d'erreurs général
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`)
);