import { display } from "./components/display";
import { keyboard, operation } from "./components/keyboard";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

const operations: operation[] = [
  {
    text: "CE",
    callback: () => {
      if (display.textContent != null && display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, -1);
      }
    },
  },
  {
    text: "√",
    callback: () => {
      display.textContent += "√";
    },
  },
  {
    text: "%",
    callback: () => {
      display.textContent += "%";
    },
  },
  {
    text: "+",
    callback: () => {
      display.textContent += "+";
    },
  },
  {
    text: "/",
    callback: () => {
      display.textContent += "/";
    },
  },
  {
    text: "x",
    callback: () => {
      display.textContent += "x";
    },
  },
  {
    text: "-",
    callback: () => {
      display.textContent += "-";
    },
  },
];

const table = keyboard(display, operations);

app?.append(display, table);
