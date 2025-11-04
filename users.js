// data/users.js

const users = [
    {
        // 1. Utilisateur Administrateur (pour la création des produits)
        name: 'Admin Karaai',
        email: 'admin@minigod.com',
        // Le mot de passe sera haché automatiquement par le hook pre('save') du modèle User
        password: 'Password123!', 
        isAdmin: true,
    },
    {
        // 2. Utilisateur Standard
        name: 'Client Test',
        email: 'client@minigod.com',
        password: 'Password123!',
        isAdmin: false,
    },
    // Vous pouvez ajouter d'autres utilisateurs ici si nécessaire
];

module.exports = users;