export function createButton(value: string | number) {
  const button = document.createElement("button");
  button.textContent = `${value}`;
  button.value = `${value}`;
  button.className = "button";

  return button;
}

export function addButtonToCell(
  row: HTMLTableRowElement,
  text: string,
  colSpan: number = 1,
  callback: () => void
) {
  const cell = row.insertCell();
  const button = createButton(text);
  button.addEventListener("click", callback);
  cell.append(button);
  cell.colSpan = colSpan;
}

export function clearButton(value: string, callback: () => void) {
  const button = document.createElement("button");

  if (button === null) {
    throw new Error("No clear logger element found");
  }

  button.style.backgroundColor = "red";
  button.className = "button";
  button.textContent = value;
  button.addEventListener("click", callback);

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "white";
    button.style.color = "red";
  })

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "red";
    button.style.color = "white";
  })

  return button
}