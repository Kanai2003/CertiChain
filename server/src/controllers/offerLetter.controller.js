import { OfferLetter } from "../models/offerLetter.model.js";
import {
  createOfferLetter,
  verifyOfferLetter,
  queryOfferLetter,
} from "../utils/blockchain.js";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

// Create an offer letter
export const createOffer = asyncHandler(async (req, res) => {
  const { candidate, salary, position, date } = req.body;
  const organisationId = req.user._id;
  const offerLetterId = uuidv4();

  const recipt = await createOfferLetter(
    offerLetterId,
    organisationId,
    candidate,
    salary,
    position,
    date,
  );

  if (!recipt) {
    throw new ApiError(400, "Offer letter creation failed on blockchain");
  }

  // Save offer letter to database
  const newOfferLetter = await OfferLetter.create({
    organization: organisationId,
    candidate: candidate,
    salary: salary,
    position: position,
    date: date,
    uniqueLink: `https://company.com/offer/${offerLetterId}`,
    blockHash: recipt.blockHash,
    transactionHash: recipt.transactionHash,
    OfferLetterId: offerLetterId,
  });

  if (!newOfferLetter) {
    throw new ApiError(400, "Offer letter creation failed on database");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, newOfferLetter, "Offer letter created successfully"),
    );
});

// Verify an offer letter
export const verifyOffer = asyncHandler(async (req, res) => {
  const { offerLetterId, offerHash } = req.body;

  console.log(offerLetterId, offerHash);

  // Verify offer letter hash on blockchain
  const isValid = await verifyOfferLetter(offerLetterId, offerHash);

  console.log("IsValid: ", isValid);

  if (!isValid) {
    return res.status(400).json({ msg: "Offer letter verification failed" });
  }

  // Query offer letter details from blockchain
  const offerDetails = await queryOfferLetter(offerLetterId);

  console.log(offerDetails);

  res.json({
    employer: offerDetails.employer,
    candidate: offerDetails.candidate,
    salary: offerDetails.salary,
    position: offerDetails.position,
    date: offerDetails.date,
    offerHash: offerDetails.offerHash,
    uniqueURL: offerDetails.uniqueURL,
  });
});
