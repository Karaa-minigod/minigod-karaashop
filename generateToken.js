// utils/generateToken.js
const jwt = require('jsonwebtoken');

// Le secret JWT doit être une variable d'environnement forte et secrète !
// Ajoutez-la à votre fichier .env : JWT_SECRET=UN_TRES_LONG_SECRET_ALEATOIRE
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Le jeton expirera après 30 jours
    });
};

module.exports = generateToken;