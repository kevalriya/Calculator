import React from 'react';
import './Buttons.css';

export default class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button id="clear" onClick={this.props.onClear}>AC</button>
        <button id="parenthesis-open" onClick={this.props.onOpenParenthesis}>(</button>
        <button id="parenthesis-close" onClick={this.props.onCloseParenthesis}>)</button>
        <button id="backspace" onClick={this.props.onBackspace}><i className="material-icons">backspace</i></button>

        <button id="exponent" onClick={this.props.onPowerOf}>x<sup>y</sup></button>
        <button id="square" onClick={this.props.onPowerOf}>x<sup>2</sup></button>
        <button id="squareroot" onClick={this.props.onSqRoot}>&radic;</button>
        <button id="modulo" onClick={this.props.onOperator}>%</button>

        <button id="seven" onClick={this.props.onDigit}>7</button>
        <button id="eight" onClick={this.props.onDigit}>8</button>
        <button id="nine" onClick={this.props.onDigit}>9</button>
        <button id="divide" onClick={this.props.onOperator}>/</button>

        <button id="four" onClick={this.props.onDigit}>4</button>
        <button id="five" onClick={this.props.onDigit}>5</button>
        <button id="six" onClick={this.props.onDigit}>6</button>
        <button id="multiply" onClick={this.props.onOperator}>*</button>

        <button id="one" onClick={this.props.onDigit}>1</button>
        <button id="two" onClick={this.props.onDigit}>2</button>
        <button id="three" onClick={this.props.onDigit}>3</button>
        <button id="subtract" onClick={this.props.onOperator}>-</button>

        <button id="decimal" onClick={this.props.onDecimal}>.</button>
        <button id="zero" onClick={this.props.onDigit}>0</button>
        <button id="equals" onClick={this.props.onEquals}>=</button>
        <button id="add" onClick={this.props.onOperator}>+</button>
      </div>
    )
  }
}