import { User, Order_Product, Product } from '../relationships/Relations.js'

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
    // Retrieve the new user's information (form or postman)
    const { password, ...restNewUser } = req.body;

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password);

    try {
        // Create a new user with the provided data
        const result = await User.create({ password: encryptedPassword, ...restNewUser });
        res.status(201).json({ data: result, message: "User successfully created" });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

export const delUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the user where the id matches
        const result = await User.destroy({ where: { id } })
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
        const result = await User.update({ password: encryptedPassword, ...restNewUser }, { where: { id } });
        res.status(200).json({ data: result, message: "User updated" });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

export const listOrdersByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the user by its primary key (id)
        const user = await User.findByPk(userId);

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