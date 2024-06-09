import Sandbox from "sandbox";

export function testAdd(code) {
  // Create new sandbox
  const s = new Sandbox();

  // Run the code with inputs in the sandbox
  s.run(`${code} addTwoNumbers(2, 3)`, (output) => {
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

  s.run(`${code} addTwoNumbers(3, 3)`, (output) => {
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