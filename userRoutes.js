// routes/userRoutes.js
const express = require('express');
const router = express.Router();
// ⚠️ Mise à jour de l'importation pour inclure authUser
// routes/userRoutes.js

// ...

const { registerUser, authUser } = require('../controllers/userControllers'); 

// ...

// Route POST pour l'inscription (déjà existante)
router.post('/', registerUser); 

// ⚠️ Nouvelle Route POST pour la connexion
router.post('/login', authUser); 

module.exports = router;