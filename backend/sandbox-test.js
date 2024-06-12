import Sandbox from "sandbox";
const s = new Sandbox();

export async function testSwitch(question_number, code) {
  question_number--;
  
  switch(question_number) {
    case 0:
      return await testAdd(code); 
    case 1:
      return await testSub(code);
    case 2:
      return await testMult(code);
    case 3:
      return await testDiv(code);
    default:
      return "Invalid Question Number";
  }
}

function runTests(code, testCases) {
  return new Promise((resolve, reject) => {
    const results = []; // Array to store the results of each test

    testCases.forEach(({ args, expected }) => {
      const testArgs = args.join(', '); //converts array of args [2, 3] into comma-separated string 2, 3
      const testName = `TestFunction(${testArgs})`; //creates the string TestFunction(testArgs)
      

      //call async function s.run to run code in sandboxed env
      s.run(`${code} ${testName}`, (output) => {
        const result = output.result;
        //updates results arr 
        results.push({ args: testArgs, result, expected });

        // Check if all tests have been executed
        if (results.length == testCases.length) {
          //creates new array with just failed tests
          const failedTests = results.filter((test) => test.result != test.expected);
          if (failedTests.length == 0) {
            resolve("All tests passed");
          } else {
            //prints all failed tests by adding it to a new array and then printing each element on a new line using .join
            const failureMessages = failedTests.map((test) => {
              return `Test failed: expected ${test.expected}, got ${test.result} for args: ${test.args}`;
            });

            resolve(failureMessages.join('\n'));
          }
        }
      });
    });
  });
}

function testAdd(code) {
  const testCases = [
    { args: [2, 3], expected: 5 },
    { args: [3, 3], expected: 6 },
  ];
  return runTests(code, testCases);
}

function testSub(code) {
  const testCases = [
    { args: [2, 3], expected: -1 },
    { args: [3, 3], expected: 0 },
  ];
  return runTests(code, testCases);
}

function testMult(code) {
  const testCases = [
    { args: [3, 3], expected: 9 },
    { args: [2, 4], expected: 8 },
  ];
  return runTests(code, testCases);
}

function testDiv(code) {
  const testCases = [
    { args: [6, 3], expected: 2 },
    { args: [20, 5], expected: 4 },
  ];
  return runTests(code, testCases);
}
