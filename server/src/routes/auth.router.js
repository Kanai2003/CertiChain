import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/varifyJwt.js";
import { register, loginUser } from "../controllers/user.controller.js";

// @route    POST api/auth/register
// @desc     Register user
// @access   Private
router.post("/register", verifyToken, register);

// @route    POST api/auth/login
// @desc     Login user
// @access   Private
router.post("/login", verifyToken, loginUser);

export default router;
