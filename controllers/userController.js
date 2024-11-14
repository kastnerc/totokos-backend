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
    const { id } = req.params;

    try {
        // Delete the user where the id matches
        const result = await User.destroy({ where: { id_user: id } })
        res.status(200).json({ data: result, message: "User successfully deleted" });
    } catch (error) {
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

export const findUser = async (req, res) => {
    // Use the id (or other unique variable)
    const { id } = req.params;
    try {
        // Fetch the user by its primary key (id)
        const user = await User.findByPk(id);
        res.status(200).json({ data: user });
    } catch (error) {
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}


export const updateUser = async (req, res) => {
    // Use the id (or other unique variable)
    const { id } = req.params;
    // Retrieve the new user's information (form or postman)
    const { password, ...restNewUser } = req.body;

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password);

    try {
        // Update the user with the provided data where the id matches
        const result = await User.update({ password: encryptedPassword, ...restNewUser }, { where: { id_user: id } });
        res.status(200).json({ data: result, message: "User updated" });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

// Function without bcrypt
// export const updateUser = async (req, res) => {
//     // Retrieve the user ID from the request parameters
//     const { id } = req.params;
//     // Retrieve the updated user information from the request body
//     const updatedData = req.body;

//     try {
//         // Update the user with the provided data where the id matches
//         const [updatedRows] = await User.update(updatedData, {
//             where: { id_user: id }
//         });

//         // Check if any rows were updated
//         if (updatedRows > 0) {
//             res.status(200).json({ message: "User updated successfully" });
//         } else {
//             res.status(404).json({ message: "User not found or no changes made" });
//         }
//     } catch (error) {
//         // In case of error
//         console.log('Error code : ' + error);
//         res.status(400).json({ message: error.message });
//     }
// };

export const listOrdersByUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        // Fetch the user by its primary key (id)
        const user = await User.findByPk(id_user);

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