import { User } from "../relationships/Relations.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) return res.status(404).json({ message: "The email is incorrect" });

    try {
        // Look up the user by email
        const user = await User.findOne({ where: { email } });

        // Check if user is found
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        console.log('User found:', user); // Debugging line

        // Log the stored hashed password from the database
        console.log('Stored hashed password:', user.password);

        // Check password
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) return res.status(401).json({ message: "The password is incorrect." });

        // Create access token with role and expiration
        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};