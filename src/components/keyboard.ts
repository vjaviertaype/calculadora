export function keyboard(
  keys: string[],
  cols: number,
  rows: number,
  callback: (key: string, row: HTMLTableRowElement) => any
) {
  const table = document.createElement("table");

  for (let i = 0; i < rows; i++) {
    const row = table.insertRow();
    for (let j = 0; j < cols; j++) {
      callback(keys[i * cols + j], row);
    }
  }

  return table;
}
