import { addButtonToCell } from "./components/button";
import { display } from "./components/display";
import { calculate } from "./operations";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

const table = document.createElement("table");

for (let i = 3; i > 0; i--) {
  const row = table.insertRow();
  for (let j = 3; j > 0; j--) {
    addButtonToCell(row, String(i * 3 - j + 1), 1, () => {
      if (display.textContent != null) {
        const value = i * 3 - j + 1;
        display.textContent += value;
      }
    });
  }
}

const lastRow = table.insertRow();

addButtonToCell(lastRow, "C", 1, () => {
  if (display.textContent != null) {
    display.textContent = "";
  }
});

addButtonToCell(lastRow, "0", 1, () => {
  if (display.textContent != null) {
    display.textContent += "0";
  }
});

addButtonToCell(lastRow, ".", 1, () => {
  if (display.textContent != null) {
    display.textContent += ".";
  }
});

addButtonToCell(lastRow, "=", 1, () => {
  if (display.textContent != null) {
    display.textContent = calculate(display.textContent);
  }
});

const operations = [
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

let currentRow = table.insertRow(0);

operations.slice(0, 4).forEach(({ text, callback }) => {
  addButtonToCell(currentRow, text, 1, callback);
});

[1, 2, 3].forEach((rowIndex, i) => {
  currentRow = table.rows[rowIndex];
  addButtonToCell(
    currentRow,
    operations[i + 4].text,
    1,
    operations[i + 4].callback
  );
});

app?.append(display, table);
