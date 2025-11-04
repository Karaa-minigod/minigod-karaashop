// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Librairie essentielle pour le hachage sécurisé

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Veuillez ajouter un nom'],
        },
        email: {
            type: String,
            required: [true, 'Veuillez ajouter un email'],
            unique: true, // Assure que chaque email est unique dans la base
        },
        password: {
            type: String,
            required: [true, 'Veuillez ajouter un mot de passe'],
        },
        // Vous pouvez ajouter d'autres champs ici, comme le rôle ou l'adresse
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement les champs 'createdAt' et 'updatedAt'
    }
);

// Cette méthode est appelée juste AVANT de sauvegarder le document
userSchema.pre('save', async function (next) {
    // Si le mot de passe n'a pas été modifié, on passe à la prochaine étape
    if (!this.isModified('password')) {
        next();
    }

    // 1. Générer un "salt" (une chaîne aléatoire)
    const salt = await bcrypt.genSalt(10);
    
    // 2. Hacher le mot de passe avec ce salt
    this.password = await bcrypt.hash(this.password, salt);
});


// Méthode personnalisée pour comparer le mot de passe entré avec le mot de passe haché stocké (utilisé pour la connexion)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;