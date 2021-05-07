class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }

    allClear() {
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
        this.otherOperation = undefined
    }

    clear() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.prevOperand !== '') {
            this.result()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    chooseOtherOperation(otherOperation) {
        let result
        if (this.currentOperand === '' && isNaN(this.currentOperand)) return
        const current = parseFloat(this.currentOperand)
        this.otherOperation = otherOperation
        switch (this.otherOperation) {
            case "sin":
                result = Math.sin(current)
                break
            case "cos":
                result = Math.cos(current)
                break
            case "x2":
                result = Math.pow(current, 2)
                break
            case "√x":
                result = Math.sqrt(current)
                break
            default:
                return
        }
        this.currentOperand = result
        this.otherOperation = undefined
        this.prevOperand = ''
    }

    result() {
        let result
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '×':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandTextElement.innerText = ''
        }
    }
}




const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const otherOperationButtons = document.querySelectorAll("[data-other-operation]")
const equalsButton = document.querySelector("[data-equals]")
const allClearButton = document.querySelector("[data-all-clear]")
const clearButton = document.querySelector("[data-clear]")
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

otherOperationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOtherOperation(button.innerText)
        calculator.updateDisplay()
    } )
})

equalsButton.addEventListener('click', () => {
    calculator.result()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", () => {
    calculator.allClear()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})
