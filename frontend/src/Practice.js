import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDown from './dropDown.js';
import SubmissionForm from './submitForm.js';

//should add useEffect later on to deal with having to make api get calls to request data from backend

function Practice() {

  const [userSelection, setUserSelection] = useState(null); //question string
  const [questionNumber, setQuestionNumber] = useState(""); //question id
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const exitButton = () => {
    navigate("/")
  }
  
  const handleUserResponse = (data) => {
    setUserSelection(data.message);
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
      {userSelection && (
        <div className="response-container">
          <h2>
            {userSelection}
          </h2>
          <SubmissionForm 
          onResultReceived={handleResult}
          questionNumber={questionNumber}/>
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