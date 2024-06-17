import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionForm from './submitForm.js';
import { useUser } from '@clerk/clerk-react'



function Test () {
    const navigate = useNavigate();
    const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
    const [results, setResults] = useState([]);

    //should change the problembank structure and make 
    const questions = [
        "def foo(a,b): return a + b",
        "def bar(a, b): return a - b",
        "def ping(a, b): return a * b",
        "def pong(a, b): return a / b"
    ];

  const { user }  = useUser();

    const exitButton = () => {
        navigate("/");
      }
  
    const handleResult = (ans) => {
        //spreads the old array into a new array and adding the new result 
        //don't use .push() because for react you want to avoid modifying existing object tp update state
        if (user) {
            setResults([...results, ans]); 

        if (currentQuestionNum <= questions.length) {
            setCurrentQuestionNum(currentQuestionNum + 1);
        } 
      }
  };

  const calcScore = (arr) => {
    let total = 0;
    arr.forEach(element => {
        total += element.points;
    });
    return total;
  };


    return (
        <div>
            <h1>Test</h1>
            {/* need to make a function to pull question bank to frontend */}
            {currentQuestionNum <= questions.length ? (
            <>
                <div>
                    <p>{questions[currentQuestionNum - 1]}</p>
                    <SubmissionForm 
                    onResultReceived={handleResult}
                    userSelection={currentQuestionNum.toString()} />
                </div>
            </>
             ) : (
                <div>
                    <h2>Test Completed</h2>
                    <p>Thank you for participating!</p>
                    <div>
                        {/* makes new array by taking the elements in the result array and the index num */}
                        {/* map function iterates through each ele in the results arr and renders it*/}
                        <h3>Results</h3>
                        {results.map((result, index) => (
                            <div key={index}>
                                <p>Question {index + 1}:</p>
                                <p>{result.code}</p>
                                <div dangerouslySetInnerHTML={{ __html: result.test }} />
                            </div>
                        ))}
                        <div>
                            <h3> Total Score Out of {results.length}</h3>
                            <p>{calcScore(results)}</p>
                        </div>
                    </div>
                </div>
             )}
            
            <div className={'buttonContainer'}>
            <input
                className={'inputButton'}
                type="button"
                onClick={exitButton}
                value={"Go Back"}
            />
            </div>

    </div>
    );
}

export default Test;

//some issues for future reference: 
//1. the only function that can update what tests are run is the dropDown component 
//2. backend question back is not an array
