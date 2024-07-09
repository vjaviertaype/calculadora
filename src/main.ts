import { addButtonToCell } from "./components/button";
import { DisplayElement } from "./components/display";
import { keyboard } from "./components/keyboard";
import {
  calculate,
  replacePercentToResult,
  replaceSquareToResult,
  replaceMinusOrPlusToResult,
  tokenize,
} from "./features/functions";
import "./style.css";

customElements.define("display-element", DisplayElement, { extends: "div" });

const display = document.createElement("div", {
  is: "display-element",
}) as DisplayElement;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No app element found");
}

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

const table = keyboard(keys, 4, 5, (key, row) => {
  switch (key) {
    case "C":
      addButtonToCell(row, "C", 1, () => display.clearText());
      break;
    case "DEL":
      addButtonToCell(row, "DEL", 1, () => display.removeLastCharacter());
      break;
    case "=":
      addButtonToCell(row, "=", 1, () => {
        const operators = ["√", "+", "-", "x", "/", "%"];
        const input = tokenize(display.getText(), ...operators);
        let output;

        replaceSquareToResult(input);
        replaceMinusOrPlusToResult(input);
        replacePercentToResult(input);

        output = calculate(input, ...operators);
        display.clearText();
        display.setText(output);
      });
      break;
    default:
      addButtonToCell(row, key, 1, () => display.appendText(key));
  }
});

app.append(display, table);
