import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionForm from './submitForm.js';
import { useUser } from '@clerk/clerk-react'



function Test () {
    const navigate = useNavigate();
    const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
    const [results, setResults] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true); // Track if questions are loading
    const [userExistence, setUserExistence] = useState(false);
    const { user }  = useUser();
    const user_id = user.id;
    //prevents race conditon where the app thinks quiz ended as the questions array is empty

    //should change the problembank structure and make 
    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            const response = await fetch('http://localhost:3080/database'); // Adjust port if necessary
            if (!response.ok) {
              throw new Error('Failed to fetch questions');
            }
            const questionsData = await response.json();
            setQuestions(questionsData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
        };

        const fetchUser = async () => {
          try {
            const response = await fetch(`http://localhost:3080/results/${user_id}`); // Adjust port if necessary
            if (response.ok) {
              await response.json();
              setUserExistence(true);
              console.log("user existo");
            } else {
              throw new Error('Failed to fetch userid');
            }

          } catch (error) {
            console.log("user no existo");
            setUserExistence(false);
          }
        };

        fetchUser()
        fetchQuestions();
    }, [user_id, userExistence]);

  const exitButton = () => {
      navigate("/");
    };
  
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

  //to calc attempt number, retrieve all datas from collection as an array
  //return array lenght + 1
  //automatically called when quiz is completed
  useEffect(() => {
    const createResult = async () => {
      try {
        let newArray = [];
        newArray.push(results);
        const response = await fetch('http://localhost:3080/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userid: user.id,
            results: newArray
          })
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const updateResult = async () => {
      try {
        const response = await fetch(`http://localhost:3080/results/${user_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            results: results,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    if (questions.length > 0 && currentQuestionNum > questions.length && !userExistence) {
      createResult();
    } else if (questions.length > 0 && currentQuestionNum > questions.length && userExistence) {
      updateResult();
    }
  }, [currentQuestionNum, questions.length, user, results, userExistence, user_id]);


  return (
    <div>
        <h1>Test</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                {currentQuestionNum <= questions.length ? (
                    <div>
                        <p>{questions[currentQuestionNum - 1].question}</p>
                        <SubmissionForm
                            onResultReceived={handleResult}
                            userSelection={currentQuestionNum.toString()}
                        />
                    </div>
                ) : (
                    <div>
                        <h2>Test Completed</h2>
                        <p>Thank you for participating!</p>
                        <div>
                            <h3>Results</h3>
                            {results.map((result, index) => (
                                <div key={index}>
                                    <p>Question {index + 1}:</p>
                                    <p>{result.code}</p>
                                    <div dangerouslySetInnerHTML={{ __html: result.test }} />
                                </div>
                            ))}
                            <div>
                                <h3>Total Score Out of {results.length}</h3>
                                <p>{calcScore(results)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </>
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