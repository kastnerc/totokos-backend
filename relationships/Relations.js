// Importation des entités
import Product_Category from "../models/Product_Category.js";
import Order from "../models/Order.js";
import Order_Product from "../models/Order_Product.js";
import Ingredient from "../models/Ingredient.js";
import Ingredient_Product from "../models/Ingredient_Product.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Supplier from "../models/Supplier.js";
import Price_History from "../models/Price_History.js";

// Associations
User.hasMany(Order)

Order.belongsTo(User)
Order.hasMany(Order_Product)

Order_Product.belongsTo(Order)
Order_Product.belongsTo(Product)

Product.hasMany(Order_Product)
Product.hasMany(Ingredient_Product)
Product.hasMany(Price_History)
Product.belongsTo(Product_Category)

Product_Category.hasMany(Product)

Price_History.belongsTo(Product)

Ingredient_Product.belongsTo(Product)
Ingredient_Product.belongsTo(Ingredient)

Ingredient.hasMany(Ingredient_Product)
Ingredient.belongsTo(Supplier)

Supplier.hasMany(Ingredient)

Product.belongsToMany(Ingredient, { through: Ingredient_Product });
Ingredient.belongsToMany(Product, { through: Ingredient_Product });

Product.belongsToMany(Order, { through: Order_Product });
Order.belongsToMany(Product, { through: Order_Product });

export {User, Order, Order_Product, Product, Product_Category, Ingredient, Ingredient_Product, Supplier, Price_History}