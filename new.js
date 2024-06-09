import ollama from 'ollama'
import readline from 'readline';
import {testAdd} from "./sandbox-test.js"

//creates readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//prompt display and returns a promise to be resolved by callbacks
//prompter is called and returns a promise with a callback that calls rl.question
//when user provides input the callback executes calling rl.question with userInput
//rl.question has a callback which executes resolves (resolving the promise)
function prompter(question) {
    return new Promise((resolve, reject) => {

        const timeout = setTimeout(() => {
            rl.close();
            reject(new Error('User input timed out'));
        }, 60000);

        rl.question(question, (userInput) => {
            clearTimeout(timeout);
            resolve(userInput);
        });
    });
}


async function getUserInput() {
    try {
        const userInput = await prompter('Please describe the following function: def foo(a,b): return a + b \n' )
        return userInput;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    } 
}

//dont use chat function -> too verbose and keeps track of chat history prompting the LLM to 
//generate different response each time despite being given same input
async function callChat(userInput) {
    //try catch for error handling
    try {
        //using ollama library function to abstract away url formatting 
        //chat retains message history (could use generate instead)
        const response = await ollama.chat({
            model: 'mistral',
            //must be in array format for messages
            messages: [{
                role: 'user',
                content: "Generate a javascript function using the description" + userInput
            }]
        });
        return response.message.content;

    } catch (error) {
        console.error('Error: ', error.message);
        throw error;
    } 
}

function extractResponse(api_response) {
    const startIndex = api_response.indexOf('javascript') + 10;

    // Find the index of the closing curly brace '}' after the opening brace
    const endIndex = api_response.indexOf('}', startIndex) + 1;

    // Extract the code block from the response based on the indices
    const extractedFunc = api_response.substring(startIndex, endIndex);

    return extractedFunc;
}

async function main() {
    try {
        const userInput = await getUserInput();
        const response = await callChat(userInput);
        const extracted = extractResponse(response);
        testAdd(extracted);
    } catch (error) {
        console.error('Error in  main: ', error.message);
    } finally {
        rl.close();
    }
}

main().catch(error => {
    console.error('Unhandled error in main: ', error.message);
    rl.close();
});
