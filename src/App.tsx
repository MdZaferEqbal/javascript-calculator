import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer]         = useState("0");
  const [expression, setExpression] = useState("");
  const trimmedExpression           = expression.trim()

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  }

  const buttonPress = (symbol: string) => {
    if (symbol === "AC") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "+/-") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "%") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(trimmedExpression + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;

      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(trimmedExpression.charAt(trimmedExpression.length - 1))) return;

    const parts    = trimmedExpression.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <div id="calculator">
          <div id="display" style={{textAlign: "right"}}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id='clear' className="light-gray" onClick={() => buttonPress("AC")}><b>AC</b></button>
          <button id='negative' className="light-gray" onClick={() => buttonPress("+/-")}><b>+/-</b></button>
          <button id='percentage' className="light-gray" onClick={() => buttonPress("%")}><b>%</b></button>
          <button id='divide' className="yellow" onClick={() => buttonPress("/")}><b>/</b></button>
          <button id='seven' className="dark-gray" onClick={() => buttonPress("7")}><b>7</b></button>
          <button id='eight' className="dark-gray" onClick={() => buttonPress("8")}><b>8</b></button>
          <button id='nine' className="dark-gray" onClick={() => buttonPress("9")}><b>9</b></button>
          <button id='multiply' className="yellow" onClick={() => buttonPress("*")}><b>*</b></button>
          <button id='four' className="dark-gray" onClick={() => buttonPress("4")}><b>4</b></button>
          <button id='five' className="dark-gray" onClick={() => buttonPress("5")}><b>5</b></button>
          <button id='six' className="dark-gray" onClick={() => buttonPress("6")}><b>6</b></button>
          <button id='subtract' className="yellow" onClick={() => buttonPress("-")}><b>-</b></button>
          <button id='one' className="dark-gray" onClick={() => buttonPress("1")}><b>1</b></button>
          <button id='two' className="dark-gray" onClick={() => buttonPress("2")}><b>2</b></button>
          <button id='three' className="dark-gray" onClick={() => buttonPress("3")}><b>3</b></button>
          <button id='add' className="yellow" onClick={() => buttonPress("+")}><b>+</b></button>
          <button id='zero' className="dark-gray" onClick={() => buttonPress("0")}><b>0</b></button>
          <button id='decimal' className="dark-gray" onClick={() => buttonPress(".")}><b>.</b></button>
          <button id='equals' className="yellow" onClick={() => buttonPress("=")}><b>=</b></button>
        </div>
      </div>
    </>
  )
}

export default App
