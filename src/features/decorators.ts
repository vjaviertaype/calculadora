export function randomColor(elem: HTMLElement) {
  return () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    elem.style.color = color;
  };
}
