import express from 'express'; // Import the Express framework
import bodyParser from 'body-parser'; // Import body-parser middleware
import cors from 'cors'; // Import CORS middleware
import { selector, callChat, extractResponse } from './new.js';
import { testSwitch } from './sandbox-test.js';


const app = express(); // Create an Express application
const port = 3080; // Define the port number where the server will listen
let inputVal = 1;

// Middleware setup
app.use(bodyParser.json()); // Parse incoming JSON requests and populate req.body
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Define a route to handle POST requests at the /submit endpoint
app.post('/submit', (req, res) => {
  const userInput = req.body; // Access the parsed JSON data from the request body

  console.log('Received input:', userInput); // Log the received data to the console
  inputVal = parseInt(userInput.inputA); //access the input property of the json obj and parse the string into an int
  const responseString = selector(inputVal);
  
  res.json({ message: responseString }); // Send a response back to the client (changed plain string into a json object)
});

app.post('/answer', async (req, res) => {
  const userAnswer = req.body;
  console.log('Received input:', userAnswer);
  const ans = await callChat(userAnswer.inputB);
  console.log("ans:" + ans);
  const extracted = extractResponse(ans);
  console.log("extracted:" + extracted);

  const testResult = await testSwitch(inputVal, extracted);
  console.log("testResult: ", testResult);
  //still need to figure out how to return failed tests and generated code together as a json object

  res.json({message: testResult});
})

// Start the server and make it listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});