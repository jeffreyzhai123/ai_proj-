import express from 'express';
import { callChat, extractResponse } from '../new.js'
import { testSwitch } from '../sandbox-test.js';
import { inputVal } from './submit.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const userAnswer = req.body;
    console.log('Received input:', userAnswer);
    const ans = await callChat(userAnswer.inputB);
    console.log("ans:" + ans);
    const extracted = extractResponse(ans);
    console.log("extracted:" + extracted);
  
    const testResult = await testSwitch(inputVal, extracted);
    console.log("testResult: ", testResult);
    //still need to figure out how to return failed tests and generated code together as a json object
  
    //error with frontend msg display 
    res.json({message: testResult});
  });

  export { router as answerRouter };