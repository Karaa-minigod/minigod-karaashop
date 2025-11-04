// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Utile pour les logs
const users = require('./data/users'); // 🔑 AJOUTÉ : Assurez-vous d'avoir ce fichier
const products = require('./data/products'); 
const Product = require('./models/Product');
const User = require('./models/User'); 
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Se connecter à la base de données
connectDB();

const importData = async () => {
    try {
        // 1. Nettoyer la base de données existante
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log('✅ Base de données nettoyée !'.red.inverse);

        // 2. Importer les utilisateurs (ceux de votre fichier data/users.js)
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers.find(user => user.isAdmin);

        // Si data/users.js n'existe pas ou ne contient pas d'admin, utilisez le premier.
        const productAssignee = adminUser || createdUsers[0]; 
        
        // 3. Ajouter l'ID de l'admin à chaque produit
        const sampleProducts = products.map(product => {
            return { ...product, user: productAssignee._id };
        });

        // 4. Insérer les produits
        await Product.insertMany(sampleProducts);

        console.log('🎉 Données importées avec succès !'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur lors de l'importation : ${error.message}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log('🗑️ Données détruites avec succès !'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur lors de la destruction : ${error.message}`.red.inverse);
        process.exit(1);
    }
};


// 🔑 CORRECTION DE LA LOGIQUE D'EXÉCUTION
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}