import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDown from './dropDown.js';
import SubmissionForm from './submitForm.js';

//should add useEffect later on to deal with having to make api get calls to request data from backend

function Practice() {

  const [selectedQuestion, setSelectedQuestion] = useState(null); //question string
  const [questionNumber, setQuestionNumber] = useState(""); //question id
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const exitButton = () => {
    navigate("/")
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3080/database'); // Adjust port if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const questionsData = await response.json();
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
}, []);

  
  const handleUserResponse = (data) => {
    setSelectedQuestion(data.message);
  }

  //update the question id
  const handleSelectionChange = (value) => {
    setQuestionNumber(value);
  }

  const handleResult = (ans) => {
    setResult(ans);
  }
  
  return (
    <div>
      {/* Dropdown menu for question selection */}
      <div>
        <h1>Question Selector</h1>
        <DropDown 
        onUserDataReceived={handleUserResponse}
        onSelectionChange={handleSelectionChange}/>
      </div>

      {/* Submission form, uses conditional rendering (only renders if userSelection is properly updated */}
      {selectedQuestion && (
        <div className="response-container">
          {/* displays selected question */}
          <h2>
            {questions[parseInt(questionNumber) - 1].question}
          </h2>
          {/* This userSelection is a property, not to be confused with the useState variable */}
          <SubmissionForm 
          onResultReceived={handleResult}
          userSelection={questionNumber}/>
        </div>
      )}

      {/* Conditional render to display results */}
      {result && (
        <div className='result-container'>
          <p>{result.code}</p>
          <div dangerouslySetInnerHTML={{ __html: result.test }} />
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

export default Practice;