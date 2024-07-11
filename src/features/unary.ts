import { isNumber } from "./validator";
import { percent, sqrt } from "./operation";

export function unaryMinus(input: string[]) {
  const result: string[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === "-" && isNumber(input[i + 1]) && !isNumber(input[i - 1])) {
      result.push(`-${input[i + 1]}`);
      i++;
    } else {
      result.push(input[i]);
    }

    i++;
  }

  input.length = 0;
  input.push(...result);
}

export function unaryPlus(input: string[]) {
  const result: string[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === "+" && isNumber(input[i + 1]) && !isNumber(input[i - 1])) {
      result.push(input[i + 1]);
      i++;
    } else {
      result.push(input[i]);
    }

    i++;
  }

  input.length = 0;
  input.push(...result);
}

export function unarySquare(input: string[]): void {
  const result: string[] = [];
  let aux: number;
  let i = 0;
  let count;

  while (i < input.length) {
    count = 0;
    while (input[i] === "√") {
      count++;
      i++;
    }

    aux = Number(input[i]);
    while (aux && count > 0) {
      aux = sqrt(aux);
      count--;
    }

    if (aux) {
      result.push(aux.toString());
    } else {
      result.push(input[i]);
    }

    i++;
  }

  input.length = 0;
  input.push(...result);
}

export function unaryPercent(input: string[]): void {
  const result: string[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === "%" && isNumber(input[i - 1]) && !isNumber(input[i + 1])) {
      result.pop();
      result.push(percent(Number(input[i - 1])).toString());
    } else {
      result.push(input[i]);
    }
    i++;
  }

  input.length = 0;
  input.push(...result);
}
