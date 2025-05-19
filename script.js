// Calculator should be able to handle:
// 1. Basic operations (+, -, *, /)
// 2. ONLY pairs of numbers (a and b)
//      If there are more than 2 numbers inputted (a + b + c), evaluate a and b, and then proceed to c
// 3. Should allow user to clear calculator input/memory
// 4. Display should update with each input
// 5. Avoid unexpected errors:
//      Division by zero
//      Operator followed by an operator (Eg. a + - b)
//      Multiple decimal points (Eg. 1.1.1)
//      Pressing = before full input is provided
// 5. Entering a new digit after an evaluation should clear the memory/input

// Extra credit:
// 1. sqrt, pow, x^y, fact
// 2. Decimals
// 3. Backspace
// 4. Keyboard support


// Retrieve all DOM elements of class 'digit' and 'operator'
const numbers = document.querySelectorAll(".digit")
const operators = document.querySelectorAll(".operator")

// Object for containing display related variables: numbers a and b, and operator
let calculation = {
    display: document.querySelector(".display"),
    a: 1,
    b: 2,
    oper: "*"
}

function update_display() {
    let calc_str = calculation.a + calculation.oper + calculation.b
    calculation.display.textContent = calc_str
}

update_display()





