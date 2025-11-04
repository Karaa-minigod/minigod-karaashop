// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Assurez-vous que le chemin est correct

// Middleware pour vérifier le JWT et attacher l'utilisateur à la requête (req.user)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extraire le jeton
            token = req.headers.authorization.split(' ')[1];

            // Vérifier et décoder le jeton
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attacher l'utilisateur à req.user (sans le mot de passe)
            // L'ID est stocké dans le payload du token (decoded.id)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Non autorisé, jeton invalide');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Non autorisé, aucun jeton fourni');
    }
});

// Middleware pour vérifier si l'utilisateur attaché (par 'protect') est administrateur
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Laisse passer la requête
    } else {
        res.status(403); // 403 Forbidden
        throw new Error('Non autorisé, accès réservé à l\'administrateur');
    }
};

// 🔑 EXPORTATION CORRECTE : Les deux fonctions sont exportées
module.exports = { protect, admin };