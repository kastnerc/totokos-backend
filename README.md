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

Here they are, added to our database in code form:

![Screenshot 2024-11-15 223152](https://github.com/user-attachments/assets/3c60d196-6ca3-42ce-999d-ccb260a0c3ef)

## Models
Now that the diagram is correctly implemented, they can be written into the database as models. There are nine in total, reflecting the nine tables in the diagram. Here they are below:

- ### Ingredient_Product.js

This model is an intermediary one, and so it only has the quantity attribute, and nothing more.

![Screenshot 2024-11-15 204529](https://github.com/user-attachments/assets/a82bfc4b-c0bf-402a-b7a2-d3853cc281fd)

- ### Ingredient.js

The Ingreident.js model holds the ingredient's name, stock, expiry date, price per unit, and unit of measure used to quantify the ingredient(kg, tbsp etc...).

![Screenshot 2024-11-15 204611](https://github.com/user-attachments/assets/cddc50db-5182-440e-b722-a5bc8eed83b7)

- ### Order_Product.js

Yet again another intermediary model, it holds the basic quantity, and unit price, and total price of the order's products.

![Screenshot 2024-11-15 204626](https://github.com/user-attachments/assets/34ca4b5f-2068-429e-ac52-bdddb199919d)

- ### Order.js

Quite a hefty model, it contains its date of creation, iots total price, its status, which can only be one of the four following: 'in process', 'ready', 'picked up', and 'cancelled'. If a reservation is made, the attribute turns to true, and a pickup date is scheduled to let the employees know of the delayed delivery.

![Screenshot 2024-11-15 204648](https://github.com/user-attachments/assets/183726de-4a46-4d17-b555-f43122d298db)

- ### Price_History.js

This model holds only the changed price and date the old price was updated.

![Screenshot 2024-11-15 204708](https://github.com/user-attachments/assets/f60c7859-d896-49d0-be2e-ff611e9cfc97)

- ### Product_Category.js

Product_Category.js golds the names and descriptions odf all the possible categories the products can have.

![Screenshot 2024-11-15 204721](https://github.com/user-attachments/assets/99212122-63a6-479a-b69b-0e9fad377e26)

- ### Product.js

This model holds the products' name, its price, its description, its stock value, and its expiry date.

![Screenshot 2024-11-15 204735](https://github.com/user-attachments/assets/67cfc53c-162e-4fd7-8556-731e839e2b61)

- ### Supplier.js

The supplier's model holds their names, addrersses, emails, and even phone numbers to properly record each supplier in the database.

![Screenshot 2024-11-15 204750](https://github.com/user-attachments/assets/4bb936b8-1d70-4b8e-9d68-82a4686bffd4)

- ### User.js

the final and heaviest of all models, this one holds very valueble information the database needs to run safely. It holds the following information for the users: Their name, surname, username, password, and contact information. The optionnal but still important attributes are as follow: last connection to the databse, adress, city, province, country, and postal code. The final attribute is by far the most important one: Role. This is used to tell the database which user has which permissions. Employees can create, modify and delete data, whil clients can only read and enter their own information and send their own orders. If a client could do what employees could, some people with malicious intent might destroy our database, and so the role and the login controller created below prevents that by adding security to our database.

![Screenshot 2024-11-15 204804](https://github.com/user-attachments/assets/bb4e9aa6-70b2-4797-bf8e-606ef2e29f11)

## Login and authentication
### Authentication
This following page shows the authentication page, which checks if the entered email fits email formatting, and if it exists in the database, and adds it along with its password. the password is hashed, basicallu meaining it is rewritten into a new password that is very hard for humans to identify and manipulate.

![Screenshot 2024-11-15 211924](https://github.com/user-attachments/assets/f72d9a77-4e5f-4f9f-ba84-ff553273bbf8)

### CheckToken

This next piece of code is like a security guard for your website or app. It checks if a person (a user) is allowed to do something, based on a secret code (the JWT token) that they send along with their request.

Here's how it works:
Someone tries to do something (like view their orders): They send a request to the app with a special ticket (called a token) in the header. This token proves they are who they say they are. The guard (this code) checks if the ticket is there: The guard looks at the request and checks if there’s a ticket (token) in it. If there’s no ticket, the guard says, "Hey, you can't come in!" and sends a message saying "Non authenticated" (which means you're not logged in). The guard checks if the ticket is in the right format: If the ticket is there, the guard makes sure it’s in the correct format. If it looks wrong, the guard says "Invalid token format" and sends them away. The guard verifies the ticket: Next, the guard checks if the ticket is real. They use a special secret (the SECRET_KEY) that only the app knows, to make sure the ticket is valid. If the ticket is fake or expired, the guard says "Unauthorized" and won’t let them in. The guard remembers who the person is: If the ticket is good, the guard looks inside the ticket and finds out who the person is (like their id and role, for example, if they’re an admin or a user). Then the guard says, "Okay, you can go in now!" and lets them through. The person can now do what they wanted: The app lets the person do what they came for, like checking their orders or viewing a product.

In summary:

No ticket? You can’t come in.

Bad ticket? You can’t come in.

Good ticket? You’re allowed in, and we know who you are!

It’s like a security guard who checks your ID (the token), makes sure it’s real, and lets you in if everything looks good.

![Screenshot 2024-11-15 222716](https://github.com/user-attachments/assets/1b510935-99e9-4a8d-b8b0-2a79e574f0be)

### Login

And this final code in the authentication section is used to detect if a user has the role of an employee. if the user does not, then the progrm prevents them from commiting potentially harmful modifications to the database.

![Screenshot 2024-11-15 222855](https://github.com/user-attachments/assets/0b6062f9-7aa9-497a-a968-2e5c0f581854)

## Controllers

Once a user has gone through the authentication, they are free to use the database as far as it permits them. They can do things like create an order, view their profile, view the products for sale, etc. These actions are coded as controllers in our database. There are more than 40 in our database, so we'll only mention the notable ones.

### General Controllers

Some controllers appear in many different files at once, so they've been narrowed down to the following four: 
- get
- post
- patch
- delete

Every controller in our database fall under one of these four. And for good reason. Get is the most popular controller. It goes throughout the database, and collects information, and writes it for the user to read. This is also the least impactful controller, as no changes are being done. Post on the other hand, is responsible for creating information that the database stores deep in its memory. 

### GET

### POST

### PATCH

### DELETE



## Validations
## Middlewares
## Index
## Config

