import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';

function Stats() {
    const { user } = useUser();
    const user_id = user.id;

    const [userData, setUserData] = useState({});
    const [userInput, setUserInput] = useState("");
    const [quizArray, setQuizArray] = useState([]);
    const [outofbound, setOutofbound] = useState(false);
   
    //const [displayText, setDisplayText] = useState("");
    //outofbound needs useState because when its value changes, it needs to trigger a re-render of the page
    //to show warning message
    let displayText = "";

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                console.log('Fetching results for user ID:', user_id);
                const response = await fetch(`http://localhost:3080/results/${user_id}`);
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchResults();
    }, [user_id]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedNum = parseInt(userInput);
        if (selectedNum - 1 < 0 || selectedNum - 1 >= userData.results.length) {
            //setDisplayText("Invalid selection: The selected number exceeds latest quiz attempt");
            displayText = "Invalid selection: The selected number exceeds latest quiz attempt";
            setOutofbound(true);
            setQuizArray([]);
        } else {
            setQuizArray(userData.results[selectedNum - 1]);
            setOutofbound(false);
        }
    };

    const exitButton = () => {
        navigate("/");
    };

    const calcScore = (arr) => {
        let total = 0;
        arr.forEach(element => {
            total += element.points;
        });
        return total;
    };

    return (
        <>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={exitButton}
                    value={"Go Back"}
                />
            </div>
            <div>
                {userData.results ? (
                    <>
                        <h3> Latest attempt is attempt number {userData.results.length}</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Submit:
                                <input type="text" value={userInput} onChange={handleChange} />
                                <button type="submit">Submit</button>
                            </label>
                        </form>

                        {!outofbound ? (
                            quizArray.length > 0 && (
                                <div>
                                    <h3>Results</h3>
                                    {quizArray.map((quiz, index) => (
                                        <div key={index}>
                                            <p>Question {index + 1}:</p>
                                            <p>{quiz.code}</p>
                                            <div dangerouslySetInnerHTML={{ __html: quiz.test }} />
                                        </div>
                                    ))}
                                    <div>
                                        <h3>Total Score Out of {quizArray.length}</h3>
                                        <p>{calcScore(quizArray)}</p>
                                    </div>
                                </div>
                            )
                        ) : (
                            <>
                                <h3>{displayText}</h3>
                                <div>Please select a number between 1 and {userData.results.length}</div>
                            </>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default Stats;
