const initApp = () => {

    const currentValueElem = document.querySelector('.currentvalue');
    const previousValueElem = document.querySelector('.previousvalue');
    let itemArray = [];
    let equationArray = [];
    let newNumberFlag = false;

    const inputButtons = document.querySelectorAll('.number');
    inputButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            const newInput = event.target.textContent;
            if (newNumberFlag) {
                currentValueElem.value =
                    newInput === '.'
                        ? "0."
                        : newInput;
                newNumberFlag = false;
            } else if (currentValueElem.value.includes('.') && newInput === '.') {
                return;
            } else {
                currentValueElem.value =
                    currentValueElem.value == 0 && currentValueElem.value.length == 1 && newInput !== '.'
                        ? newInput
                        : `${currentValueElem.value}${newInput}`;
            }
        });
    });

    const opButtons = document.querySelectorAll('.operator');
    opButtons.forEach(button => {
        button.addEventListener('click', (event) => {
  

            const newOperator = event.target.textContent;
            let currentVal = parseFloat(currentValueElem.value);
            

            // begin new equation 
            if (!itemArray.length) {
                itemArray.push(currentVal, newOperator);
                previousValueElem.textContent =
                    `${currentVal} 
                     ${newOperator}`;
                return newNumberFlag = true;
            }

 
        });
    });

    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', () => {
       const currentVal = currentValueElem.value;
        let equationObj;


            itemArray.push(currentVal);
            equationObj = {
                num1: parseFloat(itemArray[0]),
                num2: parseFloat(currentVal),
                op: itemArray[1]
            }
            equationArray.push(equationObj);

            const equationString =
                `${equationObj['num1']} ${equationObj['op']} ${equationObj['num2']}`;
    
            previousValueElem.textContent = `${equationString} =`;
    
            if (divByZero(equationString)) {
                equationArray.pop();
                currentValueElem.value = "/0=🤯💩";
                alert("divion by zero not allowed");
            } else {
                currentValueElem.value = calculate(equationString);
            }
    
            newNumberFlag = true;
            itemArray = [];
            
        });
        



        



    const clearButtons = document.querySelectorAll('.clear, .clearEntry');
    clearButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            currentValueElem.value = 0;
            previousValueElem.textContent = '';
            if (event.target.classList.contains('clear')) {
                itemArray = [];
                equationArray = [];
            }
        });
    });

    const deleteButton = document.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        currentValueElem.value = currentValueElem.value.slice(0, -1);
        if (!currentValueElem.value.length) currentValueElem.value = 0;
    });

    const signChangeButton = document.querySelector('.signChange');
    signChangeButton.addEventListener('click', () => {
        currentValueElem.value = parseFloat(currentValueElem.value) * -1;
    });

}

document.addEventListener("DOMContentLoaded", initApp);

const divByZero = (equation) => {
    return /(\/ 0$)/.test(equation);
}

const calculate = (equation, currentValueElem) => {
    console.log(equation);

    return eval(equation);
}
