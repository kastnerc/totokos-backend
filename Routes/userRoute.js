import { Router } from "express";
import { getAllUsers, findUser, addUser, updateUser, deleteUser, listOrdersByUser } from "../controllers/userController.js";
import { checkToken } from "../authentification/checkToken.js";
import { authorizeEmployee } from "../authentification/authorization.js";
import { validate } from "../middlewares/validate.js";
import userRules from "../validations/userValidations.js"
import multer from "multer";
import path from "path";

const route = Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);

      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
      }
    },
  });


route.get('/', checkToken, authorizeEmployee, getAllUsers)
.get('/:id/orders', checkToken, listOrdersByUser)
.get('/:id', checkToken, findUser)
.post('/', upload.single('Image'), validate(userRules), checkToken, authorizeEmployee, addUser) // Added Multer here
.post('/', validate(userRules), addUser)
.patch('/:id', checkToken, updateUser)
.delete('/:id', checkToken, deleteUser)

export default route