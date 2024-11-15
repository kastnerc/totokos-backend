import { User, Order_Product, Product } from '../relationships/Relations.js'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const result = await User.findAll()
        res.status(200).json({ data: result });
    } catch (error) {
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

export const addUser = async (req, res) => {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: "No users provided or invalid data format." });
    }

    try {
        const createdUsers = [];
        for (const user of users) {
            const { password, ...restNewUser } = user;

            // Validate password presence and strength
            if (!password) {
                console.log("Password is missing for user:", user.username);
                continue;
            }
            if (password.length < 8) {
                console.log("Password too short for user:", user.username);
                continue;
            }

            const hashedPassword = bcrypt.hashSync(password);

            // Create user in database
            const result = await User.create({ password: hashedPassword, ...restNewUser });
            createdUsers.push(result);
        }

        res.status(201).json({ data: createdUsers, message: "Users successfully created" });
    } catch (error) {
        console.log('Error during user creation:', error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    console.log(req.user); // This will log the user from the decoded token

    // Get the role and id from the decoded token
    const { role, id } = req.user;

    let userId;
    if (role === 'client') {
        userId = id; // Client can only delete their own user
    } else if (role === 'employe') {
        userId = req.params.id; // Employee can delete a user based on the provided id
    }

    console.log('User ID:', userId);

    // If no userId is found, return an error response
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // Delete the user where the id matches
        const result = await User.destroy({ where: { id_user: userId } });

        if (result === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ data: result, message: "User successfully deleted" });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
}

export const findUser = async (req, res) => {
    console.log(req.user); // This will log the user from the decoded token
    
    // Get the role and id from the decoded token
    const { role, id } = req.user;

    let userId;
    if (role === 'client') {
        userId = id; // Client should be able to find their own user
    } else if (role === 'employe') {
        userId = req.params.id; // Employee can look up a user by the provided id
    }

    console.log('User ID:', userId);

    // If no userId is found, return an error response
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // Fetch the user by its primary key (id_user)
        const user = await User.findByPk(userId); // Use the userId variable here

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Send back the user data
        res.status(200).json({ data: user });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    console.log(req.user);
    // Get the role from the decoded token
    const { role, id } = req.user;

    let userId;
    if (role === 'client') {
        userId = id;
    } else if (role === 'employe') {
        userId = req.params.id;
    }
    
    console.log('User ID:', userId);

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    // Retrieve the new user's information (form or postman)
    const { password, role: newRole, ...restNewUser } = req.body;

    // Prevent role from being updated
    if (newRole) {
        return res.status(400).json({ message: "Role update is not allowed." });
    }

    // Encrypt the password if provided
    let updateData = { ...restNewUser };
    if (password) {
        const encryptedPassword = bcrypt.hashSync(password);
        updateData.password = encryptedPassword;
    }

    try {
        // Update the user with the provided data where the id matches
        const result = await User.update(updateData, { where: { id_user: userId } });

        // Check if the user was found and updated
        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found." });
        }


        res.status(200).json({ data: result, message: "User updated" });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
}

export const listOrdersByUser = async (req, res) => {
    console.log(req.user); // Log the user from the decoded token

    // Get the role and id from the decoded token
    const { role, id } = req.user;

    let userId;
    if (role === 'client') {
        userId = id; // Client can only fetch their own orders
    } else if (role === 'employe') {
        userId = req.params.id; // Employee can fetch orders of any user based on the id_user parameter
    }

    console.log('User ID:', userId);

    // If no userId is found, return an error response
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // Fetch the user by its primary key (id_user)
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Get all orders associated with the user, including the products in each order
        const orders = await user.getOrders({
            include: [
                {
                    model: Order_Product,
                    include: [Product]
                }
            ]
        });

        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}