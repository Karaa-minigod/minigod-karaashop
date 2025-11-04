// middleware/errorMiddleware.js

// Middleware pour la route non trouvée (404)
const notFound = (req, res, next) => {
    const error = new Error(`Non trouvé - ${req.originalUrl}`);
    res.status(404);
    next(error); // Passe l'erreur au gestionnaire d'erreurs général
};

// Middleware général de gestion d'erreurs
const errorHandler = (err, req, res, next) => {
    // Si le statut est 200 (par défaut) et qu'une erreur est lancée, on force un statut 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // La stack trace est affichée uniquement en mode développement
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Exportation des deux fonctions
module.exports = {
    notFound,
    errorHandler,
};