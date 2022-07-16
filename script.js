// Create an input listener,
const buttons = document.querySelectorAll('button');
buttons.forEach(function (item) {
    item.addEventListener('click', makeOperation);
})

const lowerScreen = document.querySelector("#lower-screen");
const upperScreen = document.querySelector("#upper-screen");
// Create variables for firstNumber, operator, secondNumber and result
let firstNumber = "";
let operator = "";
let secondNumber ="";
let result = "";
// Input calls for function makeOperation
function makeOperation(e) {
    //function makeOperation checks input, 
    const inputValue = e.target.textContent;
    if (isNaN(inputValue)) {

        if(inputValue === "="){

            console.log(inputValue)
            if (firstNumber && operator && secondNumber){
                // if the user presses equal and there's value to every value,
                // it resolves the operation.
                //Prints result on lower-screen
                calculateOperation();
            }

        } else if (inputValue){

            if (result){
                firstNumber = result;
                result = "";
                upperScreen.textContent = "";
            } else if (firstNumber && operator && secondNumber && inputValue != "←" && inputValue != "."){
                calculateOperation();
                firstNumber = result;
                result = "";
                upperScreen.textContent = ""
            }
                // if it's an operator, it assigns value to operator
            if (inputValue == "x" || inputValue == "÷" || inputValue == "+" || inputValue == "-") {
                assignOperator(inputValue);

            } else if (inputValue == "Clear"){
                firstNumber = secondNumber = operator = "";
                lowerScreen.textContent = 0;
                upperScreen.textContent = "";

            } else if (inputValue == "←"){
                if(secondNumber){
                    if(secondNumber.length > 1){
                        secondNumber = secondNumber.slice(0, -1);
                    }
                    else {
                        secondNumber = 0;
                    }
                    lowerScreen.textContent = secondNumber;
                } else {
                    if(firstNumber.length > 1){
                        firstNumber = firstNumber.slice(0, -1);
                    }
                    else {
                        firstNumber = 0;
                    }
                    lowerScreen.textContent = firstNumber;
                }
            } else if (inputValue == "."){
                assignDecimals();
            }

            if (inputValue!= "←" && firstNumber != "") {
                upperScreen.textContent = firstNumber + " " + operator;
            }
        }

    } else if (firstNumber === "" || firstNumber == 0) {
        addFirstNumber(inputValue, true);
    } else if (operator === "") {
        addFirstNumber(inputValue, false);
    } else {
        addSecondNumber(inputValue);
    }

}

function addFirstNumber(inputValue, isEmpty) {
    if(isEmpty && !(firstNumber.toString().includes("."))){
        if(operator){
            addSecondNumber(inputValue);
            return;
        }
        lowerScreen.style.fontSize = "50px";
        firstNumber = inputValue;
        lowerScreen.textContent = firstNumber;
    } else {
        if (firstNumber.toString().length === 16) return;
        // If it's another number, and there's no value to operator,
        // it concatenates it to firstnumber
        firstNumber += inputValue;
        lowerScreen.textContent = firstNumber;
    }
}

function addSecondNumber(inputValue){
    if (secondNumber === "" || secondNumber == 0 && !(secondNumber.toString().includes("."))){
        //If it's another number, and there's value to operator,
        // it assigns it to secondNumber
        // prints second number in lower-screen and upper-screen
        secondNumber = inputValue;
        lowerScreen.textContent = secondNumber;
    } else {
        if (secondNumber.toString().length === 16) return;
        //If it's another number, and there's value to every value,
        // it concatenates to secondNumber
        secondNumber += inputValue;
        lowerScreen.textContent = secondNumber;
    }
}

function assignOperator(inputValue){
    if (firstNumber !== ""){
       switch(inputValue){
        case "x":
            operator = "x";
            break;  
        case "÷":
            operator = "÷";
            break;
        case "+":
            operator = "+";
            break;
        case "-":
            operator = "-";
    }
    }
}

function assignDecimals(){
    if (secondNumber !== "" && !(secondNumber.toString().includes("."))){
        secondNumber += ".";
    } else if (firstNumber !== "" && !(firstNumber.toString().includes("."))){
        firstNumber += ".";
    }
}

function calculateOperation(){
    switch(operator){
        case "x":
            result = firstNumber * secondNumber;
            break;
        case "÷":
            result = firstNumber / secondNumber;
            break;
        case "+":
            console.log(firstNumber + " + " + secondNumber);
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case "-":
            result = firstNumber - secondNumber;
    }
    let longestNum = getLength();
    result = result.toFixed(longestNum);
    result = parseFloat(result);
    upperScreen.textContent += " " + secondNumber + " = ";
    if (operator == "÷" && secondNumber == "0"){
        lowerScreen.textContent = "You can't do that!"
        result = "";
    } else {
        lowerScreen.textContent = result;
    }
    firstNumber = secondNumber = operator = "";
    if (result.toString().length >= 17){
        lowerScreen.style.fontSize = "36px";
    }
}

function getLength(){
    const fNDecPosition = firstNumber.toString().indexOf(".");
    const sNDecPosition = secondNumber.toString().indexOf(".");
    const fNDecimals = firstNumber.toString().slice(fNDecPosition + 1);
    const sNDecimals = secondNumber.toString().slice(sNDecPosition + 1);
    let longestNum;
    if (fNDecPosition == -1 && sNDecPosition == -1){
        longestNum = "";
        return;
    } else if (fNDecPosition == -1){
        longestNum = sNDecimals;
    } else if (sNDecPosition == -1){
        longestNum = fNDecimals;
    } else {
        fNDecimals.length > sNDecimals.length ? longestNum = fNDecimals : longestNum = sNDecimals;
    }
    return longestNum.length;
}