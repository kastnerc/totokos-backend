// Importation des entités
import Categorie_Produit from "./Categorie_Produit.js";
import Commande from "./Commande.js";
import Commande_Produit from "./Commande_Produit.js";
import Ingredient from "./Ingredient.js";
import Ingredient_Produit from "./Ingredient_Produit.js";
import Produit from "./Produit.js";
import Utilisateur from "./Utilisateur.js";
import Fournisseur from "./Fournisseur.js";
import Historique_Prix from "./Historique_Prix.js";

// Création des relations
Utilisateur.hasMany(Commande)

Commande.belongsTo(Utilisateur)
Commande.hasMany(Commande_Produit)

Commande_Produit.belongsTo(Commande)
Commande_Produit.belongsTo(Produit)

Produit.hasMany(Commande_Produit)
Produit.hasMany(Ingredient_Produit)
Produit.hasMany(Historique_Prix)
Produit.belongsTo(Categorie_Produit)

Categorie_Produit.hasMany(Produit)

Historique_Prix.belongsTo(Produit)

Ingredient_Produit.belongsTo(Produit)
Ingredient_Produit.belongsTo(Ingredient)

Ingredient.hasMany(Ingredient_Produit)
Ingredient.belongsTo(Fournisseur)

Fournisseur.hasMany(Ingredient)

export {Utilisateur, Commande, Commande_Produit, Produit, Categorie_Produit, Ingredient, Ingredient_Produit, Fournisseur, Historique_Prix}