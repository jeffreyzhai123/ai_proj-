import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const DropDown = ({ onUserDataReceived, onSelectionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const { user } = useUser();

    const handleSelect = async (e) => {
        if (user) {
            const value = e.target.value;
            setSelectedOption(value);
            onSelectionChange(value);
            
            try {
                const response = await fetch('http://localhost:3080/submit', {
                    method: 'POST', // Specify the HTTP method (POST)
                    headers: {
                      'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    },
                    body: JSON.stringify({userSelection: value}), // Convert the input state to a JSON string
                });
            
                if (response.ok) {
                    const data = await response.json();
                    onUserDataReceived(data);
                } else {
                    console.log("Error:", response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <label htmlFor="categories">
                Choose a question:
            </label>
            <select id="categories" value={selectedOption} onChange={handleSelect}>
                <option value="">--Please choose an option--</option>
                <option value="1">Question 1</option>
                <option value="2">Question 2</option>
                <option value="3">Question 3</option>
                <option value="4">Question 4</option>
            </select>
            <p>You selected: {selectedOption}</p>
        </div>

    );
};

export default DropDown;