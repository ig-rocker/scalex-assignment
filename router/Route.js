import express from "express";
import validateUser from '../Middleware/ValidateUser.js'
import isAdminUser from '../Middleware/isAdminUser.js'
import loginUser from "../controller/UserController.js";
import {getAllBook,deleteBook,addBook} from "../controller/BookController.js"

const router = express.Router();

router.post("/login",loginUser);

router.post("/home",validateUser,getAllBook);

router.post("/addBook",isAdminUser,addBook);

router.post("/deleteBook",isAdminUser,deleteBook);

export default router;
