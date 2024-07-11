import { addButtonToCell } from "./components/button";
import { DisplayElement } from "./components/display";
import { keyboard } from "./components/keyboard";
import { normalizeTokenInput } from "./features/functions";
import { add, divide, module, multiply, subtract } from "./features/operation";
import { isNumber } from "./features/validator";
import "./style.css";

customElements.define("display-element", DisplayElement, { extends: "div" });

const display = document.createElement("div", {
  is: "display-element",
}) as DisplayElement;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No app element found");
}

const operators = ["√", "%", "/", "x", "+", "-"];

const keys = [
  "C",
  "DEL",
  "√",
  "%",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "x",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

function printKey(key: string) {
  return () => display.appendText(key);
}

function removeLastCharacter() {
  display.removeLastCharacter();
}

function clearText() {
  display.clearText();
}

function calculate(operator: string, a: number, b: number): number | null {
  const operations = new Map<string, (a: number, b: number) => number>([
    ["+", add],
    ["-", subtract],
    ["x", multiply],
    ["/", divide],
    ["%", module],
  ]);

  if (operations.has(operator)) {
    return operations.get(operator)!(a, b);
  }

  return null;
}

function result(): void {
  let a, b, flag, i;
  const input: string[] = normalizeTokenInput(display.getText(), ...operators);
  let output: number | null = null;

  if (input.length === 1) {
    display.setText(input[0]);
    return;
  }

  flag = 1;
  i = 0;
  while (i < input.length && flag) {
    if (
      operators.includes(input[i]) &&
      isNumber(input[i - 1]) &&
      isNumber(input[i + 1])
    ) {
      a = output ? output : Number(input[i - 1]);
      b = Number(input[i + 1]);
      output = calculate(input[i], a, b);

      if (!output) {
        flag = 0;
      }
    }
    i++;
  }

  display.setText(output && flag ? output.toString() : "Syntax error");
}

function addKeyToCell(key: string, row: HTMLTableRowElement) {
  let callback: () => void = printKey(key);

  if (key === "C") {
    callback = clearText;
  }

  if (key === "DEL") {
    callback = removeLastCharacter;
  }

  if (key === "=") {
    callback = result;
  }

  addButtonToCell(row, key, 1, callback);
}

const table = keyboard(keys, 4, 5, addKeyToCell);

app.append(display, table);
