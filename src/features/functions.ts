import { unaryMinus, unaryPercent, unaryPlus, unarySquare } from "./unary";

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

export function ruleOfSigns(input: string[]): void {
  const result: string[] = [];
  let sign: string = "";

  for (const item of input) {
    if (item === "+" || item === "-") {
      sign = sign === "" ? item : sign === item ? "+" : "-";
    } else {
      if (sign !== "") {
        result.push(sign);
        sign = "";
      }

      result.push(item);
    }
  }

  if (sign !== "") {
    result.push(sign);
  }

  input.length = 0;
  input.push(...result);
}

export function normalizeTokenInput(
  value: string,
  ...tokens: string[]
): string[] {
  const input: string[] = tokenize(value, ...tokens);

  unaryMinus(input);
  unaryPlus(input);
  unaryPercent(input);
  unarySquare(input);
  ruleOfSigns(input);

  return input;
}
