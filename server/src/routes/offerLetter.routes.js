import express from "express";
const router = express.Router();
import {
  createOffer,
  verifyOffer,
} from "../controllers/offerLetter.controller.js";
import { verifyJWT } from "../middleware/varifyJwt.js";

// @route    POST api/offerLetter
// @desc     Create an offer letter
// @access   Private
router.post("/", verifyJWT, createOffer);

// @route    POST api/offerLetter/verify
// @desc     Verify an offer letter
// @access   Public
router.post("/verify", verifyOffer);

export default router;
