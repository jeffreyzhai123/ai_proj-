import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
//should add useEffect later on to deal with having to make api get calls to request data from backend

function Test() {
  const [inputA, setInputA] = useState(''); // State to store user input
  const [inputB, setInputB] = useState('');
  const [responseA, setResponseA] = useState('');
  const [responseB, setResponseB] = useState('');
  const { user } = useUser()
  const navigate = useNavigate()

  const exitButton = () => {
    navigate("/")
  }

  const handleChangeA = (e) => {
    if (user) {
      setInputA(e.target.value); // Update state with the current input value
    }
  };

  const handleChangeB = (e) => {
    if (user) {
      setInputB(e.target.value); // Update state with the current input value
    }
  };

  const handleSubmitA = async (e) => { //e is event object
    if (user) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to the backend server
      try {
        setResponseA(''); //set response state to an empty string each time 

        const response = await fetch('http://localhost:3080/submit', {
          method: 'POST', // Specify the HTTP method (POST)
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header to JSON
          },
          body: JSON.stringify({ inputA }), // Convert the input state to a JSON string
        });

        const data = await response.json(); // Get the response text
        setResponseA(data.message); //updates the state of the app component
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  const handleSubmitB = async (e) => {
    if (user) {
      e.preventDefault();

      try {
        setResponseB('');

        const response = await fetch('http://localhost:3080/answer', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ inputB }), 
        });
        const data = await response.json(); // Get the response text
        setResponseB(data.message); //updates the state of the app component
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  }

  return (
    <div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={exitButton}
          value={"Go Back"}
        />
      </div>
      {/* Form A: question selection */}
      <h1>Select a number between 1 and 4 inclusive</h1>
      <form onSubmit={handleSubmitA}>
        <label>
          Input:
          <input type="text" value={inputA} onChange={handleChangeA} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Form B: question display, shows only after receiving a valid response */}
      {responseA && ( //response && is a conditoional rendering where this component only gets rendered if the var response is not null
        <div className="response-container">
          <form onSubmit={handleSubmitB}>
            <h2>
              {responseA}
            </h2>
            <label>
              Answer:
              <input type="text" value={inputB} onChange={handleChangeB} />
              <button type="submit">Submit</button>
            </label>
          </form>
        </div>
      )}

      {responseB && (
        <div className='result-container'>
          <p>{responseB}</p>
        </div>
      )}
    </div>
  );
}


export default Test;