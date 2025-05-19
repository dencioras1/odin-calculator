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
    display: document.querySelector(".display"),
    status() {
        if(this.a == null && this.oper == null && this.b == null) return -1
        if(this.a != null && this.oper == null && this.b == null) return 0
        if(this.a != null && this.oper != null && this.b == null) return 1
        if(this.a != null && this.oper != null && this.b != null) return 2
    },
    update() {
        state = this.status()
        switch(state) {
            case -1:
                this.display.textContent = 0
                break
            case 0:
                this.display.textContent = this.a
                break
            case 1:
                this.display.textContent = this.a + this.oper
                break
            case 2:
                this.display.textContent = this.a + this.oper + this.b
        }
        console.log("Current status " + this.status())
        console.log(`a = ${this.a != null}; oper = ${this.oper != null}; b = ${this.b != null}`)
    },
    a: null,
    b: null,
    oper: null
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
    answer = 1
    console.log("Evaluating calculation!")
    return answer
}

function handle_input(input_button) {
    current_status = calculation.status()

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
                        case "dec":
                            if(!calculation.a.includes(".")) calculation.a += "."
                            break
                        case "zero":
                            calculation.a += "0"
                            break
                        case "one":
                            calculation.a += "1"
                            break
                        case "two":
                            calculation.a += "2"
                            break
                        case "three":
                            calculation.a += "3"
                            break   
                        case "four":
                            calculation.a += "4"
                            break
                        case "five":
                            calculation.a += "5"
                            break
                        case "six":
                            calculation.a += "6"
                            break
                        case "seven":
                            calculation.a += "7"
                            break
                        case "eight":
                            calculation.a += "8"
                            break   
                        case "nine":
                            calculation.a += "9"
                    }
                    break
                case 1:
                    console.log("penis1")
                    switch(input_button.id) {
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
                    console.log("penis2")
                    switch(input_button.id) {
                        case "dec":
                            if(!calculation.b.includes(".")) calculation.b += "."
                            break
                        case "zero":
                            calculation.b += "0"
                            break
                        case "one":
                            calculation.b += "1"
                            break
                        case "two":
                            calculation.b += "2"
                            break
                        case "three":
                            calculation.b += "3"
                            break   
                        case "four":
                            calculation.b += "4"
                            break
                        case "five":
                            calculation.b += "5"
                            break
                        case "six":
                            calculation.b += "6"
                            break
                        case "seven":
                            calculation.b += "7"
                            break
                        case "eight":
                            calculation.b += "8"
                            break   
                        case "nine":
                            calculation.b += "9"
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
                        case "clear":
                            clear_input()
                    }
                    break
                case 2:
                    switch(input_button.id) {
                        case "add":
                            calculation.a = evaluate_calculation()
                            calculation.b = null        
                            calculation.oper = "+"
                            break
                        case "sub":
                            calculation.a = evaluate_calculation()
                            calculation.b = null
                            calculation.oper = "-"
                            break
                        case "mul":
                            calculation.a = evaluate_calculation()
                            calculation.b = null
                            calculation.oper = "*"
                            break
                        case "div":
                            calculation.a = evaluate_calculation()
                            calculation.b = null
                            calculation.oper = "/"
                            break
                        case "equals":
                            calculation.a = evaluate_calculation()
                            calculation.b = null
                            calculation.oper = null
                        case "clear":
                            clear_input()
                    }
            }
    }
    update_display()
}

update_display()




