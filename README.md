# Totoko's Backend - Second summative Assignment
### Created and published by Caleb Kastner, Georgio El-Khoury, and Tristan Bastien

![Totokos Temptations Logo Website](https://github.com/calebk5/Web-Client/assets/145488814/710a1527-cb2e-4786-8a07-6891eaf5912f)

## Introduction
The following project was created by the same team that developed Totoko's Temptations last semester. The team is consisted of Caleb Kastner, the project manager, Georgio El-Koury, the driver of the project, and Tristan Bastien, the lead creative developer. The three decided to take the same bakery as Totoko's Temptations and create a backend database just as their teacher had asked. They had to make a back-end database, which would be linked with a front-end webpage they will develop later in the semester. 

## Database Representation
The project was initially designed as a Entity-Relationship Model (ERM). Here it is below.
![Screenshot 2024-11-16 164310](https://github.com/user-attachments/assets/5147d951-0e1c-4fba-b521-72898aa86223)
The model can be summed up in its nine tables:
- User
- Order
- Product
- Price_History
- Product Category
- Ingredient
- Supplier

Next, we created the physical model. Here it is below.
![image](https://github.com/user-attachments/assets/b8668ce0-e633-4766-b68d-1b749fff2128)

The model can be summed up in its nine tables:
- User
- Order
- Product
- Price_History
- Product Category
- Product_Ingredient
- Ingredient
- Supplier

## Entity Relations
The user table holds all user information and is associated with the order table. Each user may have many orders. The order table is linked with the product table in a many-to-many way. Each order may have many products, and each kind of products can appear in many different orders. In the case of a many-to-many table relationship, an intermediary table is added, such as Order_Product. The product has a price history. Each product can have their prices updated many times over, and so we store them there. The product also has its categories stored in a separate table, namely Product Category. The product table is then linked in another many-to-many relationship, but this time with ingredient. As we all know, a product, like a bagel, is made up of many ingredients. And each ingredient can appear in many different kinds of products. The intermediary table called Product_Ingreident is then added as required. Ingredient holds the data of each ingredient used in the bakery, as it should. The last table is called suppliers. It holds the data of each supplier Totoko's Temptations' bakeries take their ingredients from. As drawn in the diagram, one supplier can supply many kinds of ingredients, but one ingredient can only be sold by one supplier at a time.

Here they are, added to our database in code form:

![image](https://github.com/user-attachments/assets/e11016b2-652d-4fbf-8c14-438fcb227825)

## Models
Now that the diagram is correctly implemented, they can be written into the database as models. There are nine in total, reflecting the nine tables in the diagram. Here they are below:

- ### Ingredient_Product.js

This model is an intermediary one, and so it only has the quantity attribute, and nothing more.

![Screenshot 2024-11-15 204529](https://github.com/user-attachments/assets/a82bfc4b-c0bf-402a-b7a2-d3853cc281fd)

- ### Ingredient.js

The Ingreident.js model holds the ingredient's name, stock, expiry date, price per unit, and unit of measure used to quantify the ingredient (kg, tbsp etc...).

![Screenshot 2024-11-15 204611](https://github.com/user-attachments/assets/cddc50db-5182-440e-b722-a5bc8eed83b7)

- ### Order_Product.js

Yet again another intermediary model, it holds the basic quantity, and unit price, and total price of the order's products.

![Screenshot 2024-11-15 204626](https://github.com/user-attachments/assets/34ca4b5f-2068-429e-ac52-bdddb199919d)

- ### Order.js

Quite a hefty model, it contains its date of creation, its total price, its status, which can only be one of the four following: 'in process', 'ready', 'picked up', and 'cancelled'. If a reservation is made, the attribute turns to true, and a pickup date is scheduled to let the employees know of the delayed delivery.

![image](https://github.com/user-attachments/assets/4de89cba-8765-49fd-ae23-57dfb8655701)

- ### Price_History.js

This model holds only the changed price and date the old price was updated.

![Screenshot 2024-11-15 204708](https://github.com/user-attachments/assets/f60c7859-d896-49d0-be2e-ff611e9cfc97)

- ### Product_Category.js

Product_Category.js golds the names and descriptions of all the possible categories the products can have.

![Screenshot 2024-11-15 204721](https://github.com/user-attachments/assets/99212122-63a6-479a-b69b-0e9fad377e26)

- ### Product.js

This model holds the products' name, its price, its description, its stock value, and its expiry date.

![Screenshot 2024-11-15 204735](https://github.com/user-attachments/assets/67cfc53c-162e-4fd7-8556-731e839e2b61)

- ### Supplier.js

The supplier's model holds their names, addresses, emails, and even phone numbers to properly record each supplier in the database.

![Screenshot 2024-11-15 204750](https://github.com/user-attachments/assets/4bb936b8-1d70-4b8e-9d68-82a4686bffd4)

- ### User.js

the final and heaviest of all models, this one holds very valuable information the database needs to run safely. It holds the following information for the users: Their name, surname, username, password, and contact information. The optional but still important attributes are as follow: last connection to the database, address, city, province, country, and postal code. The final attribute is by far the most important one: Role. This is used to tell the database which user has which permissions. Employees can create, modify and delete data, whil clients can only read and enter their own information and send their own orders. If a client could do what employees could, some people with malicious intent might destroy our database, and so the role and the login controller created below prevents that by adding security to our database.

![Screenshot 2024-11-15 204804](https://github.com/user-attachments/assets/bb4e9aa6-70b2-4797-bf8e-606ef2e29f11)

## Login and authentication
### Authentication
This following page shows the authentication page, which checks if the entered email fits email formatting, and if it exists in the database, and adds it along with its password. the password is hashed, basically meaning it is rewritten into a new password that is very hard for humans to identify and manipulate.

![Screenshot 2024-11-15 211924](https://github.com/user-attachments/assets/f72d9a77-4e5f-4f9f-ba84-ff553273bbf8)

### CheckToken

This next piece of code is like a security guard for your website or app. It checks if a person (a user) is allowed to do something, based on a secret code (the JWT token) that they send along with their request.

Here's how it works:
Someone tries to do something (like view their orders): They send a request to the app with a special ticket (called a token) in the header. This token proves they are who they say they are. The guard (this code) checks if the ticket is there: The guard looks at the request and checks if there’s a ticket (token) in it. If there’s no ticket, the guard says, "Hey, you can't come in!" and sends a message saying, "Non authenticated" (which means you're not logged in). The guard checks if the ticket is in the right format: If the ticket is there, the guard makes sure it’s in the correct format. If it looks wrong, the guard says, "Invalid token format" and sends them away. The guard verifies the ticket: Next, the guard checks if the ticket is real. They use a special secret (the SECRET_KEY) that only the app knows, to make sure the ticket is valid. If the ticket is fake or expired, the guard says "Unauthorized" and won’t let them in. The guard remembers who the person is: If the ticket is good, the guard looks inside the ticket and finds out who the person is (like their id and role, for example, if they’re an admin or a user). Then the guard says, "Okay, you can go in now!" and lets them through. The person can now do what they wanted: The app lets the person do what they came for, like checking their orders or viewing a product.

In summary:

No ticket? You can’t come in.

Bad ticket? You can’t come in.

Good ticket? You’re allowed in, and we know who you are!

It’s like a security guard who checks your ID (the token), makes sure it’s real, and lets you in if everything looks good.

![Screenshot 2024-11-15 222716](https://github.com/user-attachments/assets/1b510935-99e9-4a8d-b8b0-2a79e574f0be)

### Login

And this final code in the authentication section is used to detect if a user has the role of an employee. if the user does not, then the program prevents them from committing potentially harmful modifications to the database.

![Screenshot 2024-11-15 222855](https://github.com/user-attachments/assets/0b6062f9-7aa9-497a-a968-2e5c0f581854)
![Screenshot 2024-11-19 230122](https://github.com/user-attachments/assets/7a031c0c-05fd-4ca5-b1a5-a3788c1b48e1)


The login function handles user authentication. It validates the email format and checks if the provided email exists in the database. If the user is found, it compares the provided password with the stored hashed password. If the password is correct, a JWT token is generated containing the user's ID and role, which is then returned in the response. This token can be used for subsequent authenticated requests.

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

The get request is the most popular and least impactful request a user can make the database undergo. It fetches information from around the database and writes it on-screen for the user to read.

As example, here is the ingredient's get request:

![Screenshot 2024-11-15 234650](https://github.com/user-attachments/assets/1dce0831-c2ef-47d4-83c3-b75810c6ffae)
![image](https://github.com/user-attachments/assets/0ca81e19-0ca9-44a9-bbc4-ed07c91367eb)

The getIngredients function retrieves a paginated list of ingredients based on optional filters provided in the query parameters. It applies filtering criteria on valid ingredient fields and returns a JSON response containing the filtered ingredients, total count, current page, and total pages. Each ingredient in the response includes its details such as name, quantity, or other attributes.


### GET BY ID

Very similar to the get request, however this one searches for a precise amount of information, such as searching a supplier by using its ID, as shown below:

![Screenshot 2024-11-15 234904](https://github.com/user-attachments/assets/35bec972-dea5-46ac-9ca7-3023da58a0bf)
![image](https://github.com/user-attachments/assets/30c36219-8e7c-42e6-9501-bd826654072d)

The getSupplierById function retrieves a supplier's details based on the id provided in the request URL. It queries the Supplier table for a matching primary key and returns the supplier's information in a JSON response, including fields such as the supplier's name, contact information, and any other associated attributes.

### POST

The post request is much more impactful than the get request, for it creates data for the database to store. This is rarely placed in the hands of the client, for it can create some very disruptive behaviour if handled incorrectly.

The request below creates a product category for the products to identify by:

![Screenshot 2024-11-15 235010](https://github.com/user-attachments/assets/e571fc3d-0162-431a-bfca-622cfe301574)
![image](https://github.com/user-attachments/assets/682ac0a6-c7db-4181-b894-b02a32324d94)


The addProductCategory function allows the creation of multiple product categories from an array of category objects provided in the request body. Each category includes a category_name and category_description. Valid categories are saved to the database, and the response contains a list of successfully created categories with their details.

### PATCH

The patch request is similar to the post request. It updates existing data. So if an employee wants to modify a product's price, they can do so using price history's patch requests.

As shown below, this request updates any price's history.

![Screenshot 2024-11-15 235140](https://github.com/user-attachments/assets/2431ae0e-c43b-4e04-9401-45a1314fc716)
![image](https://github.com/user-attachments/assets/a2702d3f-424a-423d-93e3-bd427f36d239)

The updateProduct function updates a product's details based on the provided id and request body data. It updates fields such as product_name, product_price, description, stock, expiry_date, and id_category. After a successful update, it retrieves the updated product and creates a new entry in the Price_History table to log the updated price with a timestamp. The response includes the updated product details and a confirmation of the price history entry.

### DELETE

The delete request is quite self-explanatory: it deletes information created by the user. This is the most destructive of all requests and is only employed when necessary.

Below lies the request to delete any desired user. Use wisely.

![Screenshot 2024-11-15 235344](https://github.com/user-attachments/assets/0736c0a2-bb76-42cc-adbd-45e2192e0b34)
![image](https://github.com/user-attachments/assets/254accd1-f591-4de4-9eba-ee41331fd595)

The deleteUser function deletes a user from the database based on their role. If the user is a client, they can only delete their own account. If the user is an employee, they can delete another user by specifying the user ID in the request. Upon successful deletion, the function returns the number of deleted records, confirming the user was successfully removed.

### Advanced Controllers

Some controllers are unique to their model, and so deserve their place in this read.me. Here they are in order of appearance:

### getProductInfoByOrderId

This controller fetches the information of all the products linked in an order.

![Screenshot 2024-11-16 010146](https://github.com/user-attachments/assets/1501d4e3-7f98-474d-ab18-32b4a07712e4)
![image](https://github.com/user-attachments/assets/6ca61769-3cc0-4122-9044-b50c0578bdfc)

The getProductInfoByOrderId function retrieves all products associated with a specific order based on the id provided in the request URL. It first checks if the order exists, then fetches and returns a JSON response containing the list of products linked to that order, including details such as product names, quantities, and prices.

### deleteProductFromOrder

This controller deletes any selected products from the order they originate in.

![Screenshot 2024-11-16 010204](https://github.com/user-attachments/assets/1e464c93-ea25-4a59-8e9e-4dfe8a10d751)
![image](https://github.com/user-attachments/assets/97330d29-5e49-4a4a-ac48-69e55f2f1d44)

The deleteProductFromOrder function removes a specific product from an order based on the orderId and productId provided in the request URL. It first verifies the existence of the order and the product within that order. If both are found, it deletes the product from the order. The response confirms the successful removal of the product.

### getProducts

At first glance, this looks like another get request. But this get request is different than the other ones in the ProductController.js file; this one is specifically built for clients. It only shows the price and name, to be able to display this when looking at the products page, without the unnecessary details.

![Screenshot 2024-11-16 010310](https://github.com/user-attachments/assets/c433c423-ab8d-4161-aee1-da7acb2f0bc5)
![image](https://github.com/user-attachments/assets/63f68cbc-8fd2-4637-96eb-04e1e31c3ba2)

The getProductNamesPrices function retrieves a paginated list of product names and prices based on optional filters provided in the query parameters. It supports filtering by any valid product attribute and returns a JSON response containing the product data, total number of products, current page, and total pages. Each product in the response includes only its name and price.

### listIngredientsByProductId

This request simply fetches all the ingredients listed in a specific product.

![Screenshot 2024-11-16 010333](https://github.com/user-attachments/assets/98f3df3e-0497-495c-827e-630efb3f68eb)
![image](https://github.com/user-attachments/assets/1585db9d-a69b-459f-b63a-984dc11d3588)

The listIngredientsByProductId function retrieves all ingredients associated with a specific product based on its ID provided in the request URL. It checks if the product exists and, if so, fetches its related ingredients using the getIngredients method. The response contains a JSON array of ingredient details, such as ingredient IDs, names, and quantities.

### listPriceHistoryByProductId

This request, like the one above, lists the price history for a selected product.

![Screenshot 2024-11-16 010349](https://github.com/user-attachments/assets/7dbfe7ae-ddda-4799-963f-d9e9ac1fb218)
![image](https://github.com/user-attachments/assets/f9a20e2d-16e3-4587-b24e-8a3e910a8818)

The listPriceHistoryByProductId function retrieves the price history for a specific product based on its ID provided in the request URL. If the product exists, it fetches all related price history records from the Price_History table and returns them in a JSON response. The response includes an array of price history entries, each containing details like the product ID, previous prices, and the dates of the changes.

### listProductsByCategory

This troublesome request fetches all the products inside a selected category.

![Screenshot 2024-11-16 010456](https://github.com/user-attachments/assets/fa239f3b-928a-4b5f-87ab-8725fabd6f90)
![image](https://github.com/user-attachments/assets/f6854a9d-685b-4cf6-9f5c-e72ac0822dc5)

The listProductsByCategory function retrieves all products associated with a specific category based on the category ID provided in the request URL. If the category exists, it fetches all products linked to it and returns them in a JSON response. The response includes an array of products, with each product's details like its ID, name, price, and any other relevant attributes.

### listOrdersByUser

And for the final request, we have maybe the most important request for bakery employees: the ability to orders based on their associated client. At first glance, this seems like another get request, but in hindsight, this helps the bakery keep track of the orders and their clients simultaneously. Very important for dealing with many orders at once.

![Screenshot 2024-11-16 010541](https://github.com/user-attachments/assets/42cbe98d-f4a0-4d5f-8c35-889f17cff18d)
![image](https://github.com/user-attachments/assets/1fed4ea6-9b98-4993-998d-6487443c5fba)

The listOrdersByUser function retrieves all orders associated with a specific user. Depending on the user's role, it determines the user ID to query. The function fetches orders from the database that belong to this user, including basic user details such as their ID and username. The Postman response includes a JSON object with the list of orders for the specified user, showing order details like the user ID, order date, total price, and status, along with the user's information.


## Create Order
The create order request is crucial in an e-commerce or inventory management system as it allows users to place orders for products. This request handles the creation of new orders, calculates the total price, and associates the order with the user who placed it. 
![image](https://github.com/user-attachments/assets/c85a3450-f66b-4976-88b6-05a80d7ede17)
![Screenshot 2024-11-19 230755](https://github.com/user-attachments/assets/eb9ee285-bda7-46d6-8316-c75d6fd65b85)

The createOrder function processes the request and returns a JSON object containing the details of the newly created orders. Each order in the response includes its ID, user ID, order date, total price, status, pickup date, and the associated products.


## Validations

If someone wanted to update their email, they can't add something like "Jim", it must look something like "Jim@outlook.com". That's what validations are for. When initiating a controller that requires a field, like a post or patch request, validations are put in place to make sure that the information inserted fits the formatting. Here are several examples:

### Validations for ingredients:

![image](https://github.com/user-attachments/assets/2bcf34cc-b555-4a8d-85bb-8c4c8ed0708a)

In the first validator, it forces the expiry date to look something like this: '2024-12-31', or even this: '2024-12-31T23:59:59.000Z'.

![Screenshot 2024-11-16 000111](https://github.com/user-attachments/assets/10783898-8dc4-45ed-a9ca-ab8e2a24b9e2)

In the second validator, it forces the price per unit to look like something like this: '19.99', '5', and even '1.241441'.

![Screenshot 2024-11-16 000124](https://github.com/user-attachments/assets/ae08f526-06ce-482b-b02d-900a32f0ddba)

In the third validator, it forces the unit measure to look like this: 'kg', 'oz', 'cups', 'tbsp', and even 'packet' and 'unit'.

![Screenshot 2024-11-16 000139](https://github.com/user-attachments/assets/e23daa75-fbc9-467b-ac53-100adefa4cf4)

Here are some more validators:

![Screenshot 2024-11-16 000641](https://github.com/user-attachments/assets/64c438f5-21f7-4bfb-8b7f-c31547d49827)

## Pagination:
Pagination allows limiting the number of items displayed per page by including data in the URL.
Here is an example below:
![image](https://github.com/user-attachments/assets/0538ba6b-a6ed-4695-9f6c-0d849444266c)

## Query variables:
Query variables allow filtering elements of the request directly by including them in the URL.
Here is an example below:
![image](https://github.com/user-attachments/assets/b0dccd1d-0353-4a36-ac8f-aa63a4c5382b)

## Routes
In the database, files are all over the place, so how are they communicating between each other? This is where the routes folders come in. They set the standard to how the applications interact, and which model contains which controller. Here's an example below of the UserRoutes.js:

![Screenshot 2024-11-16 004527](https://github.com/user-attachments/assets/dc118c50-2f0a-46d3-9855-ccc6b5e37609)

As you can see from the first half, the controllers, validations and checkToken are imported, and the second half links them all together, so that the website can use them to load the various pages to the user's screens.

## Index

The code needs a central area where all of the different parts of the code can be called, and activated. This is called the index. Here, all the necessary informations are imported from node, the routes are added, and the application is initiated, officially making our code run. Here it is below:

![Screenshot 2024-11-16 004234](https://github.com/user-attachments/assets/d040e5f5-4f73-44e3-9f9a-fabefc922017)

We aren't done, however. A few loose ends remain, so let's tie them up.

## Middleware

The middleware imported makes sure that if any validations are failed, then this returns the error message to the user. If this code runs and doesn't find any validation errors, then it lets the code going on its planned route. As you can see below, this is the only middle ware used in the project.

![Screenshot 2024-11-16 004854](https://github.com/user-attachments/assets/982e08fa-66d7-4164-b1a7-2f18bf371ce0)

## Config and .ENV

The .ENV initiates the database's name, host, port and dialect instantly. It identifies the database for the config to use. Here's the .ENV below:

![Screenshot 2024-11-16 005545](https://github.com/user-attachments/assets/dbdcff0d-cc7b-42c0-b6a9-fdd29688d8ee)

The config files is very similar to the .ENV, and is used to give the proper information the database needs to start. It gets the database its destination, its port of use to connect online, and its dialect, which is a language the app uses to talk to the database with. It gets the information from the .ENV directly. Here's the Config below:

![Screenshot 2024-11-16 005121](https://github.com/user-attachments/assets/a605e151-3a9e-4754-8359-e69cce94bc92)

## Conclusion

All in all, the database created by the team is compete, and await their grade from their teacher, expecting their work to be well rewarded. The database is fully functionnal, and is ready to be the backbone to the upcoming front-end application.

### Links

Totoko's Temptations:
https://github.com/calebk5/Web-Client-UA3

School's Program
https://www.collegelacite.ca/programmes/51046
