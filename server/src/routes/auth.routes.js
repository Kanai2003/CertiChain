import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/varifyJwt.js";
import {
  register,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

// @route    POST api/auth/register
// @desc     Register user
// @access   Private
router.post("/register", register);

// @route    POST api/auth/login
// @desc     Login user
// @access   Private
router.post("/login", loginUser);

router.post("/logout", verifyJWT, logoutUser);

export default router;
