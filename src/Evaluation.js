export function evalMe(arrExpression) {

  let expression = [...arrExpression];

  while (expression.length > 1) {
    if (expression.indexOf("(") >= 0) {
      let openingIndex = expression.indexOf("(");
      let closingIndex = expression.lastIndexOf(")");
      for (let i = openingIndex + 1; i < closingIndex; i++) {
        if (expression[i] === "(") {
          openingIndex = i;
          continue;
        }
        else if (expression[i] === ")") {
          closingIndex = i;
          break;
        }
      }
      let newExpression = expression.splice(openingIndex + 1, closingIndex - openingIndex - 1);
      expression[openingIndex] = evalMe(newExpression);
      expression.splice(openingIndex + 1, 1);
    }

    else if (expression.indexOf("√") >= 0) {
      let temp = expression.indexOf("√");
      expression[temp] = Math.sqrt(expression[temp + 1]);
      expression.splice(temp + 1, 1);
    }
    else if (expression.indexOf("^") >= 0) {
      let temp = expression.indexOf("^");
      expression[temp - 1] = Math.pow(parseFloat(expression[temp - 1]), parseFloat(expression[temp + 1]));
      expression.splice(temp, 2);
    }
    else if (expression.indexOf("*") >= 0) {
      let temp = expression.indexOf("*");
      expression[temp - 1] = parseFloat(expression[temp - 1]) * parseFloat(expression[temp + 1]);
      expression.splice(temp, 2);
    }
    else if (expression.indexOf("/") >= 0) {
      let temp = expression.indexOf("/");
      expression[temp - 1] = parseFloat(expression[temp - 1]) / parseFloat(expression[temp + 1]);
      expression.splice(temp, 2);
    }
    else if (expression.indexOf("%") >= 0) {
      let temp = expression.indexOf("%");
      expression[temp - 1] = parseFloat(expression[temp - 1]) % parseFloat(expression[temp + 1]);
      expression.splice(temp, 2);
    }
    else if (expression.indexOf("-") >= 0) {
      let temp = expression.indexOf("-");
      if (temp === 0) {
        expression[temp] = 0 - parseFloat(expression[temp + 1]);
        expression.splice(temp + 1, 1);
      } else {
        expression[temp - 1] = parseFloat(expression[temp - 1]) - parseFloat(expression[temp + 1]);
        expression.splice(temp, 2);
      }
    }
    else if (expression.indexOf("+") >= 0) {
      let temp = expression.indexOf("+");
      expression[temp - 1] = parseFloat(expression[temp - 1]) + parseFloat(expression[temp + 1]);
      expression.splice(temp, 2);
    }
  }
  return (expression[0]) + "";
}

export function isNumber(input) {
  return /\d/.test(input);
}

export function isNotNumber(input) {
  return !isNumber(input);
}