import { User, Order_Product, Product, Order } from '../relationships/Relations.js'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize';

export const getAllUsers = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;

    try {
        const offset = (page - 1) * limit;
        const where = {};

        for (const [key, value] of Object.entries(filters)) {
            if (User.rawAttributes[key]) {
                where[key] = {
                    [Op.like]: `%${value}%`
                };
            }
        }

        const result = await User.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.status(200).json({
            data: result.rows,
            total: result.count,
            page: parseInt(page),
            pages: Math.ceil(result.count / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        const isArray = Array.isArray(req.body); // Vérifie si les données sont un tableau
        const users = isArray ? req.body : [req.body]; // Normalise en tableau

        if (users.length === 0) {
            return res.status(400).json({ message: "No users provided or invalid data format." });
        }

        const createdUsers = [];
        for (const user of users) {
            const { password, ...restNewUser } = user;

            // Vérifiez si le mot de passe est présent et valide
            if (!password) {
                console.log("Password is missing for user:", user.username);
                continue;
            }
            if (password.length < 8) {
                console.log("Password too short for user:", user.username);
                continue;
            }

            const hashedPassword = bcrypt.hashSync(password);

            // Vérifiez si une image est présente (form-data)
            const image = req.file ? req.file.path : null;

            // Créez l'utilisateur dans la base de données
            const result = await User.create({
                password: hashedPassword,
                image, // Ajoutez l'image si elle est présente
                ...restNewUser,
            });
            createdUsers.push(result);
        }

        res.status(201).json({ data: createdUsers, message: "Users successfully created" });
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ message: "An error occurred while creating the user", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    console.log(req.user);

    const { role, id } = req.user;

    let userId;
    if (role === 'client') {
        userId = id; // Client can only delete their own user
    } else if (role === 'employe') {
        userId = req.params.id; // Employee can delete a user based on the provided id
    }

    console.log('User ID:', userId);

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
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
}

export const findUser = async (req, res) => {
    console.log(req.user);
    
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

        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found." });
        }


        res.status(200).json({ data: result, message: "User updated" });
    } catch (error) {
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
}

export const listOrdersByUser = async (req, res) => {
    console.log('Decoded user:', req.user);

    const { role, id: userIdFromToken } = req.user;

    let userId;
    if (role === 'client') {
        userId = userIdFromToken;
    } else if (role === 'employe') {
        userId = req.params.id;
    }

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const orders = await Order.findAll({
            where: { userIdUser: userId }, // Utilisez la bonne clé étrangère
            include: [
                {
                    model: User,
                    attributes: ['id_user', 'username']
                }
            ]
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


