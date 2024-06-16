import express from 'express';
import { callChat, extractResponse } from '../new.js'
import { testSwitch } from '../sandbox-test.js';
import { inputVal } from './submit.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const userAnswer = req.body;
    console.log('Received input:', userAnswer);
    let testId = 0;

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
  
    //error with frontend msg display 
    res.json({code: extracted, test: testResult});
  });

  export { router as answerRouter };