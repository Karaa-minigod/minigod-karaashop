// data/products.js

// L'ID utilisateur doit correspondre à l'ID d'un utilisateur admin existant dans votre DB
// J'utilise une valeur générique, vous devrez peut-être la mettre à jour si votre seeder échoue.
// Si vous utilisez la base de données de test, cet ID est généralement généré par mongoose.
// Laissez-le comme ceci si vous n'avez pas encore de code seeder stable :
// user: '60c72b2f9c8d5c0015b8d2a6', 

const products = [
    {
        name: 'T-Shirt Logo Minigod',
        // 🔑 Le chemin d'accès à l'image doit commencer par /images/
        image: '/images/tshirt_logo.jpg', 
        description:
            'T-shirt 100% coton de qualité supérieure, coupe moderne de la marque Minigod Karaaï.',
        brand: 'Minigod Karaaï',
        category: 'Vêtements',
        price: 35.00,
        countInStock: 20,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Sweat à Capuche Noir Signature',
        image: '/images/sweat_signature.jpg',
        description:
            'Sweat à capuche lourd avec impression signature Minigod Karaaï. Idéal pour les saisons froides.',
        brand: 'Minigod Karaaï',
        category: 'Vêtements',
        price: 79.99,
        countInStock: 8,
        rating: 4.8,
        numReviews: 20,
    },
    {
        name: 'Jean Skinny "Midnight"',
        image: '/images/jean_skinny.jpg',
        description:
            'Jean denim noir ajusté pour une coupe moderne et confortable. Conçu par Minigod Karaaï.',
        brand: 'Minigod Karaaï',
        category: 'Vêtements',
        price: 89.90,
        countInStock: 15,
        rating: 4.2,
        numReviews: 9,
    },
];

module.exports = products;