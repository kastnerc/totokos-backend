import { User } from '../relationships/relations.js'

// 
export const getAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        res.status(200).json({ data: result });
    } catch (error) {
        // 
        console.log('Code erreur : ' + error)
        res.status(400).json({ message: error.message })
    }
}