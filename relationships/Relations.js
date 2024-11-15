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
User.hasMany(Order,{
    foreignKey:{
        name: 'id_order',
        allowNull:false}
    })
Order.belongsTo(User)


Order.hasMany(Order_Product)
Order_Product.belongsTo(Order)


Product.hasMany(Order_Product)
Order_Product.belongsTo(Product)


Product.belongsTo(Product_Category,{
    foreignKey:{
        name:'id_category',
        allowNull:false}
})
Product_Category.hasMany(Product)


Price_History.belongsTo(Product,{
    foreignKey:{
        name: 'id_product',
        allowNull:false}
    })
Product.hasMany(Price_History)

Ingredient.belongsTo(Supplier,{
    foreignKey:{
        name:'id_supplier',
        allowNull:false}
})
Supplier.hasMany(Ingredient)

Product.belongsToMany(Ingredient, { through: 'Ingredient_Product', foreignKey: 'id_product', otherKey: 'id_ingredient'});
Ingredient.belongsToMany(Product, { through: 'Ingredient_Product',foreignKey: 'id_ingredient', otherKey: 'id_product'  });

Product.belongsToMany(Order, { through: 'Order_Product', foreignKey: 'id_product', otherKey: 'id_order' });
Order.belongsToMany(Product, { through: 'Order_Product', foreignKey: 'id_order', otherKey: 'id_product' });

export {User, Order, Order_Product, Product, Product_Category, Ingredient, Ingredient_Product, Supplier, Price_History}