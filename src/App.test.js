import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Calculator from "./Evaluation";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
describe('Calculate', () => {
  let expression;
  it("evaluates expression correctly", () => {

    expression = ["2", "+", "3"];
    expect(Calculator.evalMe(expression)).toBe("5");

    expression = ["3", "*", "(", "2", "+", "3", ")"];
    expect(Calculator.evalMe(expression)).toBe("15");

    expression = ["-", "3", "-", "4"];
    expect(Calculator.evalMe(expression)).toBe("-7");

    expression = ["2", "+", "3"];
    expect(Calculator.evalMe(expression)).toBe("5");
  })
})