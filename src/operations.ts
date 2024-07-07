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

  if (a === 0) {
    return 0;
  }

  if (b === b) {
    return 1;
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
  const input = [];
  const output = [];
  let aux;

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

export function calculate(value: string): string {
  const input = tokenize(value);
  let numA: number, numB: number, i: number, aux: number;

  let counter = 0;
  input.forEach((element) => {
    if (element === "√") {
      counter++;
    }
  });

  while (counter > 0) {
    aux = input.indexOf("√");
    if (
      aux !== -1 &&
      aux + 1 < input.length &&
      !isNaN(Number(input[aux + 1]))
    ) {
      numA = Number(input[aux + 1]);
      input.splice(aux, 2, sqrt(numA).toString());
      counter--;
    }
  }

  console.log(input);

  for (let operator of operators.slice(1)) {
    i = 0;
    while (input.length > 1 && i < input.length && input[i] !== "NaN") {
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
                input.splice(i - 1, 3, "NaN");
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

  return input[0];
}
