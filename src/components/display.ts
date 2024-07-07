export const display = document.createElement("div");

display.id = "display";
display.className = "display";

display.addEventListener("click", () => {
  if (display.textContent != null) {
    navigator.clipboard.writeText(display.textContent);
  }
});
