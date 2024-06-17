import express from 'express';
import { callChat, extractResponse } from '../new.js'
import { testSwitch } from '../sandbox-test.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const userAnswer = req.body;
    console.log('Received input:', userAnswer);
    let testId = 0;
    let correctness = 0; //0 means wrong, 1 means correct

    //if inputVal (used to select tests) has not been updated


    const ans = await callChat(userAnswer.input);
    console.log("ans:" + ans);
    const extracted = extractResponse(ans);
    console.log("extracted:" + extracted);
    testId = parseInt(userAnswer.userSelection);
    console.log(testId);

    const testResult = await testSwitch(testId, extracted);
    console.log("testResult: ", testResult);
    //still need to figure out how to return failed tests and generated code together as a json object

    //updates correctness of the question to 1 if correct and 0 if wrong.
    if(testResult.includes("passed")) {
      correctness = 1;
    } else {
      correctness = 0;
    }

    //console.log(correctness);
  
    //error with frontend msg display 
    res.json({code: extracted, test: testResult, points: correctness});
  });

  export { router as answerRouter };