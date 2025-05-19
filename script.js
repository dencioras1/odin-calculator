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
        if(this.a != null && this.oper != null) return 1
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
                this.display.textContent = this.a + this.oper + this.b
        }
        console.log("Updated to " + this.display.textContent)
    },
    a: null,
    b: null,
    oper: null
}

function update_display() {
    calculation.update()
}

function handle_input(input_button) {
    current_status = calculation.status()
    console.log("Current status: " + current_status)

    switch(input_button.className) {
        case "digit":
            console.log("Clicked " + input_button.id)

            switch(current_status) {

                // First-time input for first number (a = null, b = null, oper = null)
                case -1:
                    switch(input_button.id) {
                        case "dec":
                            calculation.a = "0."
                            update_display()
                            break
                        case "zero":
                            calculation.a = "0"
                            update_display()
                            break
                        case "one":
                            calculation.a = "1"
                            update_display()
                            break
                        case "two":
                            calculation.a = "2"
                            update_display()
                            break
                        case "three":
                            calculation.a = "3"
                            update_display()
                            break   
                        case "four":
                            calculation.a = "4"
                            update_display()
                            break
                        case "five":
                            calculation.a = "5"
                            update_display()
                            break
                        case "six":
                            calculation.a = "6"
                            update_display()
                            break
                        case "seven":
                            calculation.a = "7"
                            update_display()
                            break
                        case "eight":
                            calculation.a = "8"
                            update_display()
                            break  
                        case "nine":
                            calculation.a = "9"
                            update_display()
                    }
                    break

                // Adding input for first number (a = num, b = null, oper = null)
                case 0:
                    switch(input_button.id) {
                        case "dec":
                            if(!calculation.a.includes(".")) calculation.a += "."
                            update_display()
                            break
                        case "zero":
                            calculation.a += "0"
                            update_display()
                            break
                        case "one":
                            calculation.a += "1"
                            update_display()
                            break
                        case "two":
                            calculation.a += "2"
                            update_display()
                            break
                        case "three":
                            calculation.a += "3"
                            update_display()
                            break   
                        case "four":
                            calculation.a += "4"
                            update_display()
                            break
                        case "five":
                            calculation.a += "5"
                            update_display()
                            break
                        case "six":
                            calculation.a += "6"
                            update_display()
                            break
                        case "seven":
                            calculation.a += "7"
                            update_display()
                            break
                        case "eight":
                            calculation.a += "8"
                            update_display()
                            break   
                        case "nine":
                            calculation.a += "9"
                            update_display()
                    }
                    break
                // Input for second number (a = int, b = int/null, oper = char)
                case 1:
                    pass
    
            }
            break
        case "operator":
            console.log("Clicked operator!")

            // Input after first number (a = int, b = null, oper = null)

            // Input after second number (a = int, b = int, oper = char) 


            switch(input_button.id) {

            }
    }
}

function evaluate_calculation() {
    pass
}

update_display()




