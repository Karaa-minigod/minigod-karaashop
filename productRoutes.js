// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// 1. Contrôleurs de produits : Assurez-vous que le chemin vers controllers/ est correct.
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct 
} = require('../controllers/productController'); 

// 2. Middlewares d'autorisation : Assurez-vous que le chemin vers middleware/ est correct.
const { protect, admin } = require('../middleware/authMiddleware'); 

// Route principale: /api/products
router.route('/')
    // GET: Récupère tous les produits (Public)
    .get(getProducts) 
    // POST: Crée un nouveau produit (Privé/Admin)
    .post(protect, admin, createProduct); 

// Route de détail et suppression: /api/products/:id
router.route('/:id')
    // GET: Récupère un produit par ID (Public)
    .get(getProductById) 
    // DELETE: Supprime un produit (Privé/Admin)
    .delete(protect, admin, deleteProduct); 

module.exports = router;