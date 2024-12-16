const user_input = document.querySelector('.input-box')
const calci_buttons = document.querySelectorAll('button')
const history_container = document.querySelector('.history-box')

let result = ""
let ifResultGenerated = false
let nums = Array.from(calci_buttons)
let user_history = []

nums.forEach(button=>{
    button.addEventListener('click',calculateResult)
})

function calculateResult(e){
    let clickedButton = e.target
    let buttonValue = clickedButton.innerHTML
    if(buttonValue == '='){
        try{
            if(result.includes('/0')){
                throw new Error("ERROR! Cannot divide by zero")
            }
            const resultBeforeEquals = result
            result = eval(result)
            result = parseFloat(result.toFixed(2))        
            user_history.push(`${resultBeforeEquals} = ${result}`)
            updateHistory();
            user_input.value=result
            ifResultGenerated = true;
        }
        catch{
            user_input.value="ERROR"
            result=""
            ifResultGenerated=true
        }
    }
    else if(buttonValue=='%'){
        result=eval(result)/100
        user_input.value=result
    }
    else if(buttonValue=='AC'){
        result=''
        user_input.value=result
        ifResultGenerated=false
    }
    else if (buttonValue =='DEL'){
        result=result.substring(0,result.length-1)
        user_input.value=result
        ifResultGenerated=false
    }
    else{
        if(ifResultGenerated){
            result=''
            ifResultGenerated=false
        }
        result+=buttonValue
        user_input.value=result
    }

}

function updateHistory() {
    history_container.innerHTML = ""; 
    user_history.forEach(equation => {
        const expression = document.createElement('div');
        expression.textContent = equation;
        history_container.appendChild(expression);
    });
}