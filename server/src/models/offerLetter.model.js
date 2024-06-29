import mongoose from "mongoose";

const OfferLetterSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidate: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    uniqueLink: {
      type: String,
      required: true,
    },
    blockHash: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
    OfferLetterId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferLetter = mongoose.model("OfferLetter", OfferLetterSchema);
