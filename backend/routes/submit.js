import express from 'express';
import { selector } from '../new.js';

const router = express.Router();
let inputVal = 0; //default value is 0 (which is not a correct question id)

//this entire thing might not be needed as we no longer need to make a direct request to backend to retrieve questions
router.post('/', (req, res) => {
    const userInput = req.body; // Access the parsed JSON data from the request body
    console.log('Received input:', userInput); // Log the received data to the console
    inputVal = parseInt(userInput.userSelection); //access the input property of the json obj and parse the string into an int
    const responseString = selector(inputVal);
    res.json({ message: responseString }); // Send a response back to the client (changed plain string into a json object)
});

export { router as submitRouter, inputVal };
