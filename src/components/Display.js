import React from 'react';
import './Display.css';

export default class Display extends React.Component {


  render() {
    return (
      <div className="display-area">
        <form className="display">
          <textarea
            className="display-expression"
            value={this.props.expression.join("") + this.props.currentInput}
            readOnly>
          </textarea>
          <textarea
            className="display-result"
            id="display"
            rows="1"
            value={this.props.result}
            readOnly>
          </textarea>
        </form>
      </div>
    )
  }
}