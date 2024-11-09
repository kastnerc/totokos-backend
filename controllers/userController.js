import { User } from '../relationships/relations.js'

// List of all users
export const getAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        res.status(200).json({ data: result });
    } catch (error) {
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

// Add a user
export const addUser = async (req, res) => {
    // Retrieve the new user's information (form or postman)
    const { password, ...restNewUser} = req.body;

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password);

    try {
        const result = await User.create({password: encryptedPassword, ...restNewUser});
        res.status(201).json({ data: result, message: "User successfully created"});
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

// Delete a user
export const delUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.destroy({where: { id }})
        res.status(200).json({ data: result, message: "User successfully deleted"});
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

// User profile
export const findUser = async (req, res) => {
    // Use the id (or other unique variable)
    const { id } = req.params;
    try {
        res.status(200).json({ data: user });
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}

// Update a user
export const updateUser = async (req, res) => {
    // Use the id (or other unique variable)
    const { id } = req.params;
    // Retrieve the new user's information (form or postman)
    const { password, ...restNewUser} = req.body;

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password);

    try {
        const result = await User.update({password: encryptedPassword, ...restNewUser}, {where: { id }});
        res.status(200).json({ data: result, message: "User updated"});
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error)
        res.status(400).json({ message: error.message })
    }
}
