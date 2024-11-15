// Import necessary modules
import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    // Check if the token is present
    if (!bearerToken) return res.status(401).json({ message: 'Non authenticated' });

    const token = bearerToken.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid token format' });

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).json({ message: error.message });
        console.log('Decoded JWT:', decoded);

        // Populate req.user with decoded information
        req.user = { id: decoded.id, role: decoded.role };
        next();
    });
};