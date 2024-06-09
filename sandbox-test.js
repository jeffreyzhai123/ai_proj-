import Sandbox from "sandbox";

export function testSwitch(question_number, code) {
  question_number--;
  
  switch(question_number) {
    case 0:
      testAdd(code);
      break;
    case 1:
      testSub(code);
      break;
    case 2:
      testMult(code);
      break;
    case 3:
      testDiv(code);
      break;
    default:
      console.log("Invalid Question Number");
  }
}

function testAdd(code) {
  // Create new sandbox
  const s = new Sandbox();

  // Run the code with inputs in the sandbox
  s.run(`${code} TestFunction(2, 3)`, (output) => {
    // Define the expected result
    const expected = 5;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 5");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });

  s.run(`${code} TestFunction(3, 3)`, (output) => {
    // Define the expected result
    const expected = 6;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 6");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });
}

function testSub(code) {
  // Create new sandbox
  const s = new Sandbox();

  // Run the code with inputs in the sandbox
  s.run(`${code} TestFunction(2, 3)`, (output) => {
    // Define the expected result
    const expected = -1;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is -1");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });

  s.run(`${code} TestFunction(3, 3)`, (output) => {
    // Define the expected result
    const expected = 0;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 0");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });
}

function testMult(code) {
  // Create new sandbox
  const s = new Sandbox();

  // Run the code with inputs in the sandbox
  s.run(`${code} TestFunction(2, 3)`, (output) => {
    // Define the expected result
    const expected = 6;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 6");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });

  s.run(`${code} TestFunction(3, 3)`, (output) => {
    // Define the expected result
    const expected = 9;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 9");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });
}

function testDiv(code) {
  // Create new sandbox
  const s = new Sandbox();

  // Run the code with inputs in the sandbox
  s.run(`${code} TestFunction(3, 3)`, (output) => {
    // Define the expected result
    const expected = 1;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 1");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });

  s.run(`${code} TestFunction(6, 3)`, (output) => {
    // Define the expected result
    const expected = 2;

    // Output the result
    const result = output.result;

    if (result == expected) {
      console.log("Test passed: result is 2");
    } else {
      console.error(`Test failed: expected ${expected}, got ${result}`);
    }
  });
}