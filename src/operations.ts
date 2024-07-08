const operators = ["√", "%", "/", "x", "-", "+"];

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    return Infinity;
  }

  return a / b;
}

export function sqrt(a: number): number {
  return Math.sqrt(a);
}

export function percent(a: number): number {
  return a / 100;
}

export function modulo(a: number, b: number): number {
  return a % b;
}

export function tokenize(value: string): string[] {
  const input: string[] = [];
  const output: string[] = [];
  let aux: string;

  for (let i = 0; i < value.length; i++) {
    if (operators.includes(value[i])) {
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

function replaceSquareToResult(input: string[]) {
  let aux,
    num,
    counter = 0;
  input.forEach((element, i) => {
    if (element === operators[0] && !isNaN(Number(input[i + 1]))) {
      counter++;
    }
  });

  while (counter > 0) {
    aux = input.indexOf(operators[0]);
    num = Number(input[aux + 1]);

    if (aux !== -1 && aux + 1 < input.length && !isNaN(num)) {
      input.splice(aux, 2, sqrt(num).toString());
      counter--;
    }
  }
}

export function calculate(value: string): string {
  const input = tokenize(value);
  let numA: number, numB: number, i: number;

  replaceSquareToResult(input);

  for (let operator of operators.slice(1)) {
    i = 0;
    while (
      input.length > 1 &&
      i < input.length &&
      input[i] !== "Syntax Error"
    ) {
      if (input[i] === operator) {
        if (
          i > 0 &&
          i + 1 < input.length &&
          !isNaN(Number(input[i - 1])) &&
          !isNaN(Number(input[i + 1]))
        ) {
          numA = Number(input[i - 1]);
          numB = Number(input[i + 1]);

          switch (operator) {
            case "%":
              input.splice(i - 1, 3, modulo(numA, numB).toString());
              break;
            case "/":
              if (numB === 0) {
                input.splice(i - 1, 3, "Syntax Error");
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
  }

  if (operators.includes(input[0]) || input.length > 1) {
    return "Syntax Error";
  }

  return input[0];
}
