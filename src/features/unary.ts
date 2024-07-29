import { isNumber } from "./validator";
import { percent, sqrt } from "./operation";

export function unaryMinus(input: string[]) {
  const result: string[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === "-" && isNumber(input[i + 1]) && (i === 0 || !isNumber(input[i - 1]))) {
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
    if (input[i] === "+" && isNumber(input[i + 1]) && (i === 0 || !isNumber(input[i - 1]))) {
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
  let i = 0;

  while (i < input.length) {
    if (input[i] === '√') {
      let count = 0;
      while (input[i] === '√') {
        count++;
        i++;
      }
      if (isNumber(input[i])) {
        let value = Number(input[i]);
        while (count > 0) {
          value = sqrt(value);
          count--;
        }
        result.push(value.toString());
      } else {
        result.push('√'.repeat(count));
        result.push(input[i]);
      }
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
