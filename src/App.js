import React from 'react';
import './App.css';
import Buttons from "./components/Buttons.js";
import Display from "./components/Display"
import * as Calculator from './Evaluation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: [],
      currentInput: "",
      result: "",
      activeParenthesis: 0
    }
    this.onDigit = this.onDigit.bind(this);
    this.onDecimal = this.onDecimal.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onOpenParenthesis = this.onOpenParenthesis.bind(this);
    this.onCloseParenthesis = this.onCloseParenthesis.bind(this);
    this.onEquals = this.onEquals.bind(this);
    this.onPowerOf = this.onPowerOf.bind(this);
    this.onBackspace = this.onBackspace.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSqRoot = this.onSqRoot.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  onDigit({ target }) {
    if (this.state.result.length > 0) {
      this.onClear();
      this.setState({ currentInput: target.innerText });
      return;
    }

    let currentInput = this.state.currentInput;
    const expression = this.state.expression;
    const lastElement = expression[expression.length - 1];
    if (currentInput.length > 0) { }
    else if (expression.length > 0 && Calculator.isNumber(lastElement)) {
      currentInput = expression.pop();
    }
    else if (lastElement === ")") expression.push("*");

    currentInput = currentInput.concat(target.innerText);
    this.setState({ currentInput: currentInput });
  }

  onEquals() {
    if (this.state.result.length > 0) return;
    const currentInput = this.state.currentInput;
    const expression = this.state.expression;
    if (currentInput.length > 0) {
      expression.push(currentInput);
    } else if (expression.length === 0) return;

    let lastElement = expression[expression.length - 1];
    let activeParenthesis = this.state.activeParenthesis;
    while (Calculator.isNotNumber(lastElement) && lastElement !== ")") {
      if (lastElement === "(") activeParenthesis = activeParenthesis - 1;
      expression.pop();
      if (expression.length === 0) return;
      lastElement = expression[expression.length - 1];
    }
    while (activeParenthesis !== 0) {
      expression.push(")");
      activeParenthesis = activeParenthesis - 1;
    }
    let result = Calculator.evalMe(expression);
    this.setState({ result: result, currentInput: "", activeParenthesis: activeParenthesis });
  }

  onBackspace() {
    let currentInput = this.state.currentInput;
    const expression = this.state.expression;
    const lastElement = expression[expression.length - 1]

    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, currentInput.length - 1);
    }
    else if (Calculator.isNotNumber(lastElement)) {
      if (lastElement === ")") {
        this.setState((prevState) => ({ activeParenthesis: prevState.activeParenthesis + 1 }))
      }
      else if (lastElement === "(") {
        this.setState((prevState) => ({ activeParenthesis: prevState.activeParenthesis - 1 }))
      }
      expression.pop();
    }
    else {
      currentInput = expression.pop();
      currentInput = currentInput.slice(0, currentInput.length - 1);
    }
    this.setState({ currentInput: currentInput, result: "" });
  }

  onDecimal({ target }) {
    if (this.state.result.length > 0) {
      this.onClear();
      this.setState({ currentInput: "0." });
      return;
    }
    let currentInput = this.state.currentInput;
    const expression = this.state.expression;
    const lastElement = expression[expression.length - 1];

    if (currentInput.length === 0 && Calculator.isNotNumber(lastElement)) {
      currentInput = "0."
      this.setState({ currentInput: currentInput });
      return;
    }
    else if (Calculator.isNumber(lastElement)) {
      currentInput = expression.pop();
      this.setState({ currentInput: currentInput });
    }
    if (currentInput.includes(".")) {
      return;
    } else this.onDigit({ target });
  }

  onPowerOf({ target }) {
    if (this.state.result.length > 0) {
      let expression = [this.state.result, "^"];
      if (target.innerText === "x2") expression.push("2");
      this.setState({ expression: expression, result: "" });
      return;
    }
    const currentInput = this.state.currentInput;
    const expression = this.state.expression;
    let lastElement = expression[expression.length - 1];
    let activeParenthesis = this.state.activeParenthesis;
    if (currentInput.length > 0) {
      expression.push(currentInput, "^");
      if (target.innerText === "x2") expression.push("2");
    }
    else if (expression.length > 0) {
      while (Calculator.isNotNumber(lastElement) && lastElement !== ")") {
        if (lastElement === "(") activeParenthesis = activeParenthesis - 1;
        expression.pop();
        lastElement = expression[expression.length - 1];
      }
      expression.push("^");
      if (target.innerText === "x2") expression.push("2");
    }
    this.setState({ currentInput: "", activeParenthesis: activeParenthesis });
  }

  onSqRoot() {
    if (this.state.result.length > 0) {
      let expression = ["√", "(", this.state.result, ")"];
      this.setState({ expression: expression, result: "" });
      return;
    }
    const currentInput = this.state.currentInput;
    const expression = this.state.expression;
    const lastElement = expression[expression.length - 1];
    let activeParenthesis = this.state.activeParenthesis;

    if (currentInput.length > 0) {
      expression.push(currentInput, "*", "√", "(");
      activeParenthesis = activeParenthesis + 1;
    }
    else if (Calculator.isNumber(lastElement) || lastElement === ")") {
      expression.push("*", "√", "(");
      activeParenthesis = activeParenthesis + 1;
    }
    else {
      expression.push("√", "(");
      activeParenthesis = activeParenthesis + 1;
    }
    this.setState({ currentInput: "", activeParenthesis: activeParenthesis });
  }

  onOpenParenthesis() {
    if (this.state.result.length > 0) {
      this.onClear();
      this.setState((prevState) => ({
        expression: ["("], activeParenthesis: prevState.activeParenthesis + 1
      }));
      return;
    }
    const expression = this.state.expression;
    const currentInput = this.state.currentInput;
    const lastElement = expression[expression.length - 1];
    if (currentInput.length > 0) {
      expression.push(currentInput, "*", "(");
      this.setState({ currentInput: "" });
    }
    else if (Calculator.isNumber(lastElement) || lastElement === ")") {
      expression.push("*", "(");
    }
    else expression.push("(");
    this.setState((prevState) => ({ activeParenthesis: prevState.activeParenthesis + 1 }));
  }

  onCloseParenthesis() {
    if (this.state.activeParenthesis < 1) return;

    const expression = this.state.expression;
    const currentInput = this.state.currentInput;
    const lastElement = expression[expression.length - 1];
    if (currentInput.length > 0) {
      expression.push(currentInput, ")");
      this.setState({ currentInput: "" })
    }
    else if (Calculator.isNumber(lastElement) || lastElement === ")") {
      expression.push(")");
    }
    else if (lastElement === "(") {
      expression.pop();
    }
    else if (Calculator.isNotNumber(lastElement)) {
      expression.pop();
      expression.push(")");
    }
    this.setState((prevState) => ({ activeParenthesis: prevState.activeParenthesis - 1 }));
  }

  onOperator({ target }) {
    if (this.state.result.length > 0) {
      this.onClear();
      let expression = [this.state.result, target.innerText];
      this.setState({ expression: expression });
      return;
    }

    let currentInput = this.state.currentInput;
    const expression = this.state.expression;
    const lastElement = expression[expression.length - 1];
    if (expression.length === 0 && currentInput.length === 0 && target.innerText !== "-") return;
    else if (currentInput.length > 0) {
      if (currentInput.indexOf(".") === currentInput.length - 1) {
        currentInput = currentInput.slice(0, currentInput.length - 1);
      }
      expression.push(currentInput);
      this.setState({ currentInput: "" });
    }
    else if (lastElement === "-") return;
    else if (lastElement === "(" || lastElement === "√") {
      if (target.innerText !== "-") return;
    }
    else if (Calculator.isNotNumber(lastElement) && lastElement !== ")") {
      expression.pop();
    }
    expression.push(target.innerText);
    this.setState({ expression: expression });
  }

  onClear() {
    this.setState({
      expression: [],
      lastInputType: "",
      currentInput: "",
      result: "",
      activeParenthesis: 0
    })
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.onClear();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <Display
            currentInput={this.state.currentInput}
            result={this.state.result}
            expression={this.state.expression}>
          </Display>
          <Buttons
            onDigit={this.onDigit}
            onDecimal={this.onDecimal}
            onPowerOf={this.onPowerOf}
            onSqRoot={this.onSqRoot}
            onOperator={this.onOperator}
            onOpenParenthesis={this.onOpenParenthesis}
            onCloseParenthesis={this.onCloseParenthesis}
            onBackspace={this.onBackspace}
            onClear={this.onClear}
            onEquals={this.onEquals}>
          </Buttons>
        </div>
      </div>
    );
  }
}

export default App;
