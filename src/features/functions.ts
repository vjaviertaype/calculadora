import {
  add,
  divide,
  module,
  multiply,
  percent,
  sqrt,
  subtract,
} from "./operation";

export function tokenize(value: string, ...separators: string[]): string[] {
  const input: string[] = [];
  const output: string[] = [];
  let aux: string;

  for (let i = 0; i < value.length; i++) {
    if (separators.includes(value[i])) {
      if (input.length > 0) {
        aux = input.join("");
        output.push(aux);
        input.length = 0;
      }
      output.push(value[i]);
    } else {
      input.push(value[i]);
    }
  }

  if (input.length > 0) {
    aux = input.join("");
    output.push(aux);
  }

  return output;
}

export function replaceSquareToResult(input: string[]) {
  let i = input.length;
  while (i > 0) {
    if (input[i - 1] === "√") {
      if (!isNaN(Number(input[i]))) {
        input.splice(i - 1, 2, sqrt(Number(input[i])).toString());
        i++;
      }
    }

    i--;
  }

  i = input.lastIndexOf("√");
  if (i !== -1 && i + 1 < input.length && !isNaN(Number(input[i + 1]))) {
    input.splice(i, 2, sqrt(Number(input[i + 1])).toString());
  }

  if (input[input.length - 1] === "√") {
    input[0] = "Syntax Error";
  }
}

export function replacePercentToResult(input: string[]) {
  let i = 0;
  while (i < input.length) {
    if (
      i + 1 < input.length &&
      !isNaN(Number(input[i])) &&
      input[i + 1] === "%" &&
      (i + 2 >= input.length ||
        isNaN(Number(input[i + 2])) ||
        input[i + 2] === "%")
    ) {
      input.splice(i, 2, percent(Number(input[i])).toString());
      i--;
    }
    i++;
  }
}

export function replaceMinusOrPlusToResult(input: string[]) {
  let i = 0;
  while (i < input.length) {
    if (
      (input[i] === "+" || input[i] === "-") &&
      (input[i + 1] === "+" || input[i + 1] === "-")
    ) {
      if (input[i] === input[i + 1]) {
        input.splice(i, 2, "+");
      } else {
        input.splice(i, 2, "-");
      }
      i--;
    } else if (
      (input[i] === "+" || input[i] === "-") &&
      !isNaN(Number(input[i + 1]))
    ) {
      if (input[i] === "-") {
        input[i + 1] = input[i] + input[i + 1];
      }
      input.splice(i, 1);
    }

    i++;
  }
}

export function calculate(input: string[], ...operators: string[]): string {
  let numA: number, numB: number, i: number;

  i = 0;
  while (input.length > 1 && i < input.length) {
    if (operators.includes(input[i])) {
      if (
        i > 0 &&
        i + 1 < input.length &&
        !isNaN(Number(input[i - 1])) &&
        !isNaN(Number(input[i + 1])) &&
        input[0] !== "Syntax Error"
      ) {
        numA = Number(input[i - 1]);
        numB = Number(input[i + 1]);

        switch (input[i]) {
          case "%":
            input.splice(i - 1, 3, module(numA, numB).toString());
            break;
          case "/":
            if (numB === 0) {
              input[0] = "Syntax Error";
              break;
            }
            input.splice(i - 1, 3, divide(numA, numB).toString());
            break;
          case "x":
            input.splice(i - 1, 3, multiply(numA, numB).toString());
            break;
          case "-":
            input.splice(i - 1, 3, subtract(numA, numB).toString());
            break;
          case "+":
            input.splice(i - 1, 3, add(numA, numB).toString());
            break;
        }
        i--;
      }
    }
    i++;
  }

  if (input.length === 1 && !isNaN(Number(input[0]))) {
    return input[0];
  }

  return "Syntax Error";
}
