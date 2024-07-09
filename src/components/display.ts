export class DisplayElement extends HTMLDivElement {
  constructor() {
    super();
    this.className = "display";
    this.id = "display";
    this.textContent = "";
    this.addEventListener("click", () => this.copyToClipboard());
  }

  clearText() {
    this.textContent = "";
  }

  removeLastCharacter() {
    if (!this.textContent || this.textContent.length === 1) {
      return;
    }

    this.textContent = this.textContent.slice(0, -1);
  }

  removeSubstringToText(substring: string) {
    if (
      !this.textContent ||
      this.textContent === "" ||
      substring === "" ||
      this.textContent.length < substring.length
    ) {
      return;
    }

    this.textContent = this.textContent.replace(substring, "");
  }

  appendText(text: string) {
    this.textContent += text;
  }

  getText() {
    if (!this.textContent) {
      return "";
    }

    return this.textContent;
  }

  setText(text: string) {
    this.textContent = text;
  }

  getLength() {
    if (!this.textContent) {
      return 0;
    }

    return this.textContent.length;
  }

  copyToClipboard() {
    if (!navigator.clipboard) {
      return;
    }

    if (!this.textContent) {
      return;
    }

    navigator.clipboard.writeText(this.textContent);
  }
}
