import Web3 from "web3";
import { createRequire } from "module";
import { ApiError } from "./ApiError.js";
const require = createRequire(import.meta.url);
const OfferLetterContract = require("../../../smart-contracts/build/contracts/OfferLetterContract.json");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const setupContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = OfferLetterContract.networks[networkId];
  if (!deployedNetwork) {
    throw new Error('Contract not deployed on the detected network');
  }
  const contract = new web3.eth.Contract(
    OfferLetterContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

export const createOfferLetter = async (
  offerLetterId,
  organisation,
  candidate,
  salary,
  position,
  date
) => {
  const contract = await setupContract();
  const accounts = await web3.eth.getAccounts();

  // Ensure all parameters are strings
  offerLetterId = String(offerLetterId);
  organisation = String(organisation);
  candidate = String(candidate);
  salary = String(salary);
  position = String(position);
  date = String(date);

  const receipt = await contract.methods
    .createOfferLetter(
      offerLetterId,
      organisation,
      candidate,
      salary,
      position,
      date
    )
    .send({ from: accounts[0] });

  console.log(receipt);

  if (!receipt) {
    throw new ApiError(
      400,
      "Offer letter creation failed on blockchain -- receipt not found"
    );
  }

  return receipt;
};

export const verifyOfferLetter = async (offerLetterId, offerHash) => {
  const contract = await setupContract();

  // Ensure all parameters are strings
  offerLetterId = String(offerLetterId);
  offerHash = String(offerHash);

  console.log('Params to verifyOfferHash:', offerLetterId, offerHash);

  const result = await contract.methods
    .verifyOfferHash(offerLetterId, offerHash)
    .call({ gas: 3000000 });

  console.log("blockchain result", result);

  return result;
};


export const queryOfferLetter = async (offerLetterId) => {
  const contract = await setupContract();
  const result = await contract.methods.queryOfferLetter(offerLetterId).call();
  return {
    employer: result[0],
    candidate: result[1],
    salary: result[2],
    position: result[3],
    date: result[4],
    offerHash: result[5],
    uniqueURL: result[6]
  };
};
