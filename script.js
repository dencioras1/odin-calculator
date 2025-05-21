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
// 1. x^y, fact
// 2. Decimals
// 3. Backspace
// 4. Keyboard support


// Retrieve all DOM elements of class 'digit' and 'operator'
let numbers = document.querySelectorAll(".digit")
let operators = document.querySelectorAll(".operator")

numbers.forEach(number => {
    number.addEventListener("click", function() { handle_input(this) } )
});

operators.forEach(operator => {
    operator.addEventListener("click", function() { handle_input(this) } )
})

// Object for containing display related variables: numbers a and b, and operator
let calculation = {
    display_a: document.querySelector("#a.display"),
    display_b: document.querySelector("#b.display"),
    display_oper: document.querySelector("#oper.display"),
    status() {
        if(this.a == null && this.oper == null && this.b == null && this.evaluated == false) return -1
        if(this.a != null && this.oper == null && this.b == null && this.evaluated == false) return 0
        if(this.a != null && this.oper != null && this.b == null && this.evaluated == false) return 1
        if(this.a != null && this.oper != null && this.b != null && this.evaluated == false) return 2
        if(this.evaluated == true) return 3
    },
    update() {
        state = this.status()
        switch(state) {
            case -1:
                this.display_a.textContent = null
                this.display_oper.textContent = null
                this.display_b.textContent = "_"
                break
            case 0:
                // this.display_a.textContent = null
                // this.display_oper.textContent = null

                this.display_b.textContent = this.a
                break
            case 1:
                this.display_a.textContent = this.a
                this.display_oper.textContent = this.oper
                this.display_b.textContent = 0
                break
            case 2:
                this.display_b.textContent = this.b
                break
            case 3:
                this.display_a.textContent = null
                this.display_oper.textContent = null
                this.display_b.textContent = this.a
        }
        update_large_numbers()
        console.log("Current status " + this.status())
        console.log(`a = ${this.a != null}; oper = ${this.oper != null}; b = ${this.b != null}`)
    },
    a: null,
    b: null,
    oper: null,
    evaluated: false
}

function update_large_numbers() {
    switch(calculation.status()) {
        case 0:
            if(calculation.a != null && ((calculation.a.includes("-") && calculation.a.length >= 10) || (!calculation.a.includes("-") && calculation.a.length >= 9))){
                calculation.display_b.textContent = parseFloat(calculation.a).toExponential(2)
            } 
            break
        case 1:
            if(calculation.a != null && ((calculation.a.includes("-") && calculation.a.length >= 10) || (!calculation.a.includes("-") && calculation.a.length >= 9))) calculation.display_a.textContent = parseFloat(calculation.a).toExponential(2)
            if(calculation.b != null && ((calculation.b.includes("-") && calculation.b.length >= 10) || (!calculation.b.includes("-") && calculation.b.length >= 9))) calculation.display_b.textContent = parseFloat(calculation.b).toExponential(2)
            break
        case 2:
            if(calculation.a != null && ((calculation.a.includes("-") && calculation.a.length >= 10) || (!calculation.a.includes("-") && calculation.a.length >= 9))) calculation.display_a.textContent = parseFloat(calculation.a).toExponential(2)
            if(calculation.b != null && ((calculation.b.includes("-") && calculation.b.length >= 10) || (!calculation.b.includes("-") && calculation.b.length >= 9))) calculation.display_b.textContent = parseFloat(calculation.b).toExponential(2)
            break
        case 3:
            if(calculation.a != null && ((calculation.a.includes("-") && calculation.a.length >= 10) || (!calculation.a.includes("-") && calculation.a.length >= 9))) calculation.display_b.textContent = parseFloat(calculation.a).toExponential(2)
    }

    // if((this.a.includes("-") && this.a.length >= 10) || (!this.a.includes("-") && this.a.length >= 9)) this.display_b.textContent = parseFloat(this.a).toExponential(2)
    // if((this.b.includes("-") && this.b.length >= 10) || (!this.b.includes("-") && this.a.length >= 9)) this.display_b.textContent = parseFloat(this.a).toExponential(2)

}

function clear_input() {
    calculation.a = null
    calculation.b = null
    calculation.oper = null
    update_display()
}

function update_display() {
    calculation.update()
}

function evaluate_calculation() {
    let answer = null

    switch(calculation.oper) {
        case "+":
            answer = parseFloat(calculation.a) + parseFloat(calculation.b)
            break
        case "-":
            answer = parseFloat(calculation.a) - parseFloat(calculation.b)
            break
        case "*":
            answer = parseFloat(calculation.a) * parseFloat(calculation.b)
            break
        case "/":
            if(calculation.b == "0") {
                clear_input()
                alert("Don't try any funny business now...")
            }
            else {
                answer = parseFloat(calculation.a) / parseFloat(calculation.b)
            }
            break
        case "^":
            answer = Math.pow(parseFloat(calculation.a), parseFloat(calculation.b))
            break
        case "!":
            console.log(calculation.a)
            console.log(parseFloat(calculation.a) % 1 == 0)
            console.log(calculation.b)
            if(calculation.a != null && parseFloat(calculation.a) % 1 == 0 && calculation.b == null) {
                answer = 1
                console.log("Factorial...")
                for(let i = parseInt(calculation.a); i >= 1; i--) {
                    answer *= i
                }
            }
    }

    console.log("Calculated: " + answer)

    calculation.a = answer.toString()
    calculation.oper = null
    calculation.b = null

    calculation.evaluated = true
}

function handle_input(input_button) {
    let current_status = calculation.status()

    switch(input_button.className) {
        case "digit":
            switch(current_status) {
                case -1:
                    switch(input_button.id) {
                        case "dec":
                            calculation.a = "0."
                            break
                        case "zero":
                            calculation.a = "0"
                            break
                        case "one":
                            calculation.a = "1"
                            break
                        case "two":
                            calculation.a = "2"
                            break
                        case "three":
                            calculation.a = "3"
                            break   
                        case "four":
                            calculation.a = "4"
                            break
                        case "five":
                            calculation.a = "5"
                            break
                        case "six":
                            calculation.a = "6"
                            break
                        case "seven":
                            calculation.a = "7"
                            break
                        case "eight":
                            calculation.a = "8"
                            break  
                        case "nine":
                            calculation.a = "9"
                    }
                    break
                case 0:
                    switch(input_button.id) {
                        case "sign":
                            if(!calculation.a.includes("-")) calculation.a = "-" + calculation.a
                            else calculation.a = calculation.a.slice(1)
                            break
                        case "dec":
                            if(!calculation.a.includes(".")) calculation.a += "."
                            break
                        case "zero":
                            if(calculation.a != "0") calculation.a += "0"
                            break
                        case "one":
                            if(calculation.a != "0") calculation.a += "1"
                            break
                        case "two":
                            if(calculation.a != "0") calculation.a += "2"
                            break
                        case "three":
                            if(calculation.a != "0") calculation.a += "3"
                            break   
                        case "four":
                            if(calculation.a != "0") calculation.a += "4"
                            break
                        case "five":
                            if(calculation.a != "0") calculation.a += "5"
                            break
                        case "six":
                            if(calculation.a != "0") calculation.a += "6"
                            break
                        case "seven":
                            if(calculation.a != "0") calculation.a += "7"
                            break
                        case "eight":
                            if(calculation.a != "0") calculation.a += "8"
                            break   
                        case "nine":
                            if(calculation.a != "0") calculation.a += "9"
                    }
                    break
                case 1:
                    switch(input_button.id) {
                        case "dec":
                            calculation.b = "0."
                            break
                        case "zero":
                            calculation.b = "0"
                            break
                        case "one":
                            calculation.b = "1"
                            break
                        case "two":
                            calculation.b = "2"
                            break
                        case "three":
                            calculation.b = "3"
                            break   
                        case "four":
                            calculation.b = "4"
                            break
                        case "five":
                            calculation.b = "5"
                            break
                        case "six":
                            calculation.b = "6"
                            break
                        case "seven":
                            calculation.b = "7"
                            break
                        case "eight":
                            calculation.b = "8"
                            break   
                        case "nine":
                            calculation.b = "9"
                    }
                    break
                case 2:
                    switch(input_button.id) {
                        case "sign":
                            if(!calculation.b.includes("-")) calculation.b = "-" + calculation.b
                            else calculation.b = calculation.b.slice(1)
                            break
                        case "dec":
                            if(!calculation.b.includes(".")) calculation.b += "."
                            break
                        case "zero":
                            if(calculation.b != "0") calculation.b += "0"
                            break
                        case "one":
                            if(calculation.b != "0") calculation.b += "1"
                            break
                        case "two":
                            if(calculation.b != "0") calculation.b += "2"
                            break
                        case "three":
                            if(calculation.b != "0") calculation.b += "3"
                            break   
                        case "four":
                            if(calculation.b != "0") calculation.b += "4"
                            break
                        case "five":
                            if(calculation.b != "0") calculation.b += "5"
                            break
                        case "six":
                            if(calculation.b != "0") calculation.b += "6"
                            break
                        case "seven":
                            if(calculation.b != "0") calculation.b += "7"
                            break
                        case "eight":
                            if(calculation.b != "0") calculation.b += "8"
                            break   
                        case "nine":
                            if(calculation.b != "0") calculation.b += "9"
                    }
                    break
                case 3:
                    calculation.evaluated = false
                    switch(input_button.id) {
                        case "sign":
                            if(!calculation.a.includes("-")) calculation.a = "-" + calculation.a
                            else calculation.a = calculation.a.slice(1)
                            break
                        case "dec":
                            calculation.a = "0."
                            break
                        case "zero":
                            calculation.a = "0"
                            break
                        case "one":
                            calculation.a = "1"
                            break
                        case "two":
                            calculation.a = "2"
                            break
                        case "three":
                            calculation.a = "3"
                            break   
                        case "four":
                            calculation.a = "4"
                            break
                        case "five":
                            calculation.a = "5"
                            break
                        case "six":
                            calculation.a = "6"
                            break
                        case "seven":
                            calculation.a = "7"
                            break
                        case "eight":
                            calculation.a = "8"
                            break  
                        case "nine":
                            calculation.a = "9"
                    }
            }
            break
        case "operator":
            console.log("Clicked operator!")
            switch(current_status) {
                case -1:
                    calculation.a = "0"
                    switch(input_button.id) {
                        case "add":
                            calculation.oper = "+"
                            break
                        case "sub":
                            calculation.oper = "-"
                            break
                        case "mul":
                            calculation.oper = "*"
                            break
                        case "div":
                            calculation.oper = "/"
                            break
                        case "pow":
                            calculation.oper = "^"
                            break
                        case "fac":
                            if(!calculation.a.includes("e")) {
                                calculation.oper = "!"
                                evaluate_calculation()
                            }
                            break
                        case "clear":
                            clear_input()
                    }
                    break
                case 0:
                    switch(input_button.id) {
                        case "add":
                            calculation.oper = "+"
                            break
                        case "sub":
                            calculation.oper = "-"
                            break
                        case "mul":
                            calculation.oper = "*"
                            break
                        case "div":
                            calculation.oper = "/"
                            break
                        case "pow":
                            calculation.oper = "^"
                            break
                        case "fac":
                            if(!calculation.a.includes("e")) {
                                calculation.oper = "!"
                                evaluate_calculation()
                            }
                            break
                        case "clear":
                            clear_input()
                    }
                    break
                case 1:
                    calculation.b = "0"
                    switch(input_button.id) {
                        case "add":
                            calculation.oper = "+"
                            evaluate_calculation()
                            break
                        case "sub":
                            calculation.oper = "-"
                            evaluate_calculation()
                            break
                        case "mul":
                            calculation.oper = "*"
                            evaluate_calculation()
                            break
                        case "div":
                            calculation.oper = "/"
                            evaluate_calculation()
                            break
                        case "pow":
                            calculation.oper = "^"
                            evaluate_calculation()
                            break
                        case "equals":
                            evaluate_calculation()
                            break
                        case "clear":
                            clear_input()
                    }
                    break
                case 2:
                    switch(input_button.id) {
                        case "add":
                            evaluate_calculation()        
                            calculation.oper = "+"
                            break
                        case "sub":
                            evaluate_calculation()
                            calculation.oper = "-"
                            break
                        case "mul":
                            evaluate_calculation()
                            calculation.oper = "*"
                            break
                        case "div":
                            evaluate_calculation()
                            calculation.oper = "/"
                            break
                        case "pow":
                            evaluate_calculation()
                            calculation.oper = "^"
                            break
                        case "equals":
                            evaluate_calculation()
                            break
                        case "clear":
                            clear_input()
                    }
                    break
                case 3:
                    calculation.evaluated = false
                    switch(input_button.id) {
                        case "add":
                            calculation.oper = "+"
                            break
                        case "sub":
                            calculation.oper = "-"
                            break
                        case "mul":
                            calculation.oper = "*"
                            break
                        case "div":
                            calculation.oper = "/"
                            break
                        case "pow":
                            calculation.oper = "^"
                            break
                        case "fac":
                            if(!calculation.a.includes("e")) {
                                calculation.oper = "!"
                                evaluate_calculation()
                            }
                            break
                        case "clear":
                            clear_input()
                    }
            }
    }
    update_display()
}

update_display()




