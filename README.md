# Totoko's Backend - Second sommative assignement
## 
### Created and published by Caleb Kastner, Georgio El-Khoury, and Tristan Bastien

## Introduction
The following project was created by the same team that developped Totoko's Temptations last semester. The team is consisted of Caleb Kastner, the project manager, Georgio El-Koury, the driver of the project, and Tristan Bastien, the lead creative developper. The three decided to take the same bakery as Totoko's Temptations, and create a backend database just as their teacher had asked. They had to make a back end database, which would be linked with a front end webpage they will develop later in the semester. 

## Database representation
The project was initially designed as a physical model. Here it is below.

![image](https://github.com/user-attachments/assets/b8668ce0-e633-4766-b68d-1b749fff2128)

The model can be summed up in its nine tables:

- User
- Order
- Order_Product
- Product
- Price_History
- Product Category
- Product_Ingredient
- Ingredient
- Supplier

## Entity Relations
The user table holds all user information, and is associated with the order table. Each user may have many orders. The order table is linked with the product table in a many-to-many way. Each order may have many products, and each kind of products can appear in many different orders. In the case of a many-to-many table relationship, an intermidiary table is added, such as Order_Product. The product has a price history. Each product can have their prices updated many times over, and so we sotre them there. The product also has its categories stored in a separate table, namely Product Category. The product table is then linked in another many-to-many relationship, bt this time with ingredient. As we all know, a product, like a bagel, is made up of many ingredients. ANd, each ingredient can appear in many differen kinds of products. The intermediary table called Product_Ingreident is then added as required. Ingredient holds the data of each ingredient used in the bakery, as it should. The last table is called suppliers. It holds the data of each supplier Totoko's Temptations' bakeries take their ingreidents from. As drawn in the diagram, one supplier can supply many different kinds of ingredients, but one ingredient can only be sold by one supplier at a time.

## Models


## 

