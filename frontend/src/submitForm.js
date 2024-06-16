import React, { useState } from 'react';

const SubmissionForm = ({onResultReceived, userSelection}) => {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3080/answer', {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify({ input, userSelection }), 
            });
    
            if (response.ok) {
                const data = await response.json(); // Get the response text
                onResultReceived(data); //updates the state of the app component
                setInput(''); //clearing input form after submission
            } else {
                console.log("Error:", response.statusText);
            }
          } catch (error) {
            console.error('Error submitting data:', error);
          }
        };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={input} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </label>
            </form>
        </div>
    );
}

export default SubmissionForm;