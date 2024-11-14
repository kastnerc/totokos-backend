export const authorizeEmployee = (req, res, next) => {
    console.log('Decoded User:', req.user); // Log the user object
    if (req.user && req.user.role === 'employe') {
        return next(); // Access granted, proceed to the next middleware or controller
    } else {
        return res.status(403).json({ message: "Access refused, only accessible to employees." });
    }
};