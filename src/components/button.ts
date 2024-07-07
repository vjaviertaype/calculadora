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
