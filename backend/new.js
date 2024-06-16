import ollama from 'ollama'
import readline from 'readline';
import {testSwitch} from "./sandbox-test.js"
import * as constants from './problembank.js';


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

async function selectQuestion() {
    try {
        const questionNumber = await prompter('Please enter a number between 1 and 4 inclusive to select a question:  ');
        const num = parseInt(questionNumber);
        if (num < 1 || num > 4) {
            throw Error('Number out of bound');
        } else {
            return num;
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export function selector(questionNumber) {
    let questionToAsk = constants.q1;
    switch (true) {
        case questionNumber == 1:
            questionToAsk = constants.q1;
            break;
        case questionNumber == 2:
            questionToAsk = constants.q2;
            break;
        case questionNumber == 3:
            questionToAsk = constants.q3;
            break;
        case questionNumber == 4:
            questionToAsk = constants.q4;
            break;
        default:
            questionToAsk = constants.q1;
    }
    return questionToAsk;
}

async function getUserInput(questionToAsk) {
    try {
        const userInput = await prompter('Please describe the following function: ' + questionToAsk + '\n')
        return userInput;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    } 
}

//dont use chat function -> too verbose and keeps track of chat history prompting the LLM to 
//generate different response each time despite being given same input
export async function callChat(userInput) {
    //try catch for error handling
    try {
        //using ollama library function to abstract away url formatting 
        //chat retains message history (could use generate instead)
        const response = await ollama.chat({
            model: 'mistral',
            //must be in array format for messages
            messages: [{
                role: 'user',
                content: "Generate a javascript function using the description" + userInput + ". Name this function TestFunction"
            }]
        });
        return response.message.content;

    } catch (error) {
        console.error('Error: ', error.message);
        throw error;
    } 
}

export function extractResponse(api_response) {
    const startIndex = api_response.indexOf('javascript') + 10;

    // Find the index of the closing backtick '`' that marks the end of the response
    const endIndex = api_response.indexOf('`', startIndex);

    // Extract the code block from the response based on the indices
    const extractedFunc = api_response.substring(startIndex, endIndex);
    return extractedFunc;
}

async function promptToContinue() {
    try {
        const endloop = await prompter("Do you want to continue? (yes/no): \n");
        return endloop.trim().toLowerCase() == 'yes';
    } catch (error) {
        if (error.message == 'User input timed out') {
            console.error('User input timed out. Exiting...');
            return false; 
        } else {
            throw error; 
        }
    }
}

async function main() {
    let continueFlag = true;
    do {
        try {
            const questionNumber = await selectQuestion();
            const questionToAsk = selector(questionNumber);
            const userInput = await getUserInput(questionToAsk);
            const response = await callChat(userInput);
            const extracted = extractResponse(response);
            const result = testSwitch(questionNumber, extracted);
            console.log(extracted); 
            console.log(result);
            continueFlag = await promptToContinue();

        } catch (error) {
            console.error('Error in  main: ', error.message);
            continueFlag = false;
        } 
    } while (continueFlag);
    rl.close();
}

/*
main().catch(error => {
    console.error('Unhandled error in main: ', error.message);
    rl.close();
});
*/